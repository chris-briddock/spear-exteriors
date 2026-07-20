import { randomBytes, createHmac, timingSafeEqual } from 'node:crypto';
import express, { type Request, type Response, type Router } from 'express';
import { gcRequest, GoCardlessApiError, GoCardlessConfigError, isGoCardlessConfigured } from './gocardless-client';
import { readCookie } from './cookies';

const SESSION_COOKIE_NAME = 'gc_session_token';
const SESSION_COOKIE_MAX_AGE_MS = 30 * 60 * 1000;

interface RedirectFlowResponse {
  redirect_flows: {
    id: string;
    redirect_url: string;
  };
}

interface CompleteRedirectFlowResponse {
  redirect_flows: {
    id: string;
    links: {
      mandate: string;
      customer: string;
    };
  };
}

function getSiteUrl(req: Request): string {
  const configured = process.env['SITE_URL'];
  if (configured) {
    return configured.replace(/\/$/, '');
  }
  return `${req.protocol}://${req.headers.host}`;
}

function handleGoCardlessError(res: Response, error: unknown): void {
  if (error instanceof GoCardlessConfigError) {
    console.error('GoCardless is not configured:', error.message);
    res.status(503).json({ error: 'Direct Debit setup is not available right now. Please call or email us instead.' });
    return;
  }
  if (error instanceof GoCardlessApiError) {
    console.error('GoCardless API error:', error.status, error.message);
    res.status(502).json({ error: 'We could not reach our payment provider. Please try again shortly.' });
    return;
  }
  console.error('Unexpected GoCardless error:', error);
  res.status(500).json({ error: 'Something went wrong. Please try again shortly.' });
}

export function createGoCardlessRouter(): Router {
  const router = express.Router();

  router.get('/status', (_req, res) => {
    res.json({ configured: isGoCardlessConfigured() });
  });

  router.post('/redirect-flows', async (req: Request, res: Response) => {
    try {
      const sessionToken = randomBytes(24).toString('hex');
      const siteUrl = getSiteUrl(req);

      const data = await gcRequest<RedirectFlowResponse>('/redirect_flows', {
        redirect_flows: {
          description: 'Spear Exterior Cleaning - Direct Debit',
          session_token: sessionToken,
          success_redirect_url: `${siteUrl}/direct-debit/complete`,
        },
      });

      res.cookie(SESSION_COOKIE_NAME, sessionToken, {
        httpOnly: true,
        secure: req.secure,
        sameSite: 'lax',
        maxAge: SESSION_COOKIE_MAX_AGE_MS,
        path: '/api/gocardless',
      });

      res.json({ redirectUrl: data.redirect_flows.redirect_url });
    } catch (error) {
      handleGoCardlessError(res, error);
    }
  });

  router.post('/redirect-flows/:id/complete', async (req: Request, res: Response) => {
    const sessionToken = readCookie(req, SESSION_COOKIE_NAME);
    if (!sessionToken) {
      res.status(400).json({ error: 'Your Direct Debit session has expired. Please start again.' });
      return;
    }

    try {
      const data = await gcRequest<CompleteRedirectFlowResponse>(
        `/redirect_flows/${encodeURIComponent(req.params['id'])}/actions/complete`,
        { data: { session_token: sessionToken } },
      );

      res.clearCookie(SESSION_COOKIE_NAME, { path: '/api/gocardless' });
      res.json({
        mandateId: data.redirect_flows.links.mandate,
        customerId: data.redirect_flows.links.customer,
      });
    } catch (error) {
      handleGoCardlessError(res, error);
    }
  });

  router.post('/webhooks', (req: Request, res: Response) => {
    const secret = process.env['GOCARDLESS_WEBHOOK_SECRET'];
    const signature = req.headers['webhook-signature'];
    const rawBody = (req as Request & { rawBody?: Buffer }).rawBody;

    if (!secret || !signature || typeof signature !== 'string' || !rawBody) {
      res.status(400).end();
      return;
    }

    const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
    const expectedBuffer = Buffer.from(expected, 'hex');
    const providedBuffer = Buffer.from(signature, 'hex');

    if (
      expectedBuffer.length !== providedBuffer.length ||
      !timingSafeEqual(expectedBuffer, providedBuffer)
    ) {
      res.status(498).end();
      return;
    }

    // Acknowledge immediately; GoCardless retries on non-2xx or slow responses.
    res.status(204).end();

    const events = Array.isArray(req.body?.events) ? req.body.events : [];
    for (const event of events) {
      // No database is wired up yet, so events are only logged for now.
      // Hook this up to persistence/email notifications once storage is available.
      console.log('GoCardless webhook event:', event.resource_type, event.action, event.links);
    }
  });

  return router;
}
