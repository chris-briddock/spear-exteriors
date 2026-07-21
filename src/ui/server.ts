import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express, { type Request } from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createGoCardlessRouter } from './server/gocardless-router';

function getAllowedHosts(): string[] {
  const hosts = new Set<string>(['localhost', '127.0.0.1']);
  const siteUrl = process.env['SITE_URL'];
  if (siteUrl) {
    try {
      hosts.add(new URL(siteUrl).hostname);
    } catch {
      console.warn(`SITE_URL "${siteUrl}" is not a valid URL, ignoring it for allowedHosts.`);
    }
  }
  const extraHosts = process.env['ALLOWED_HOSTS'];
  if (extraHosts) {
    for (const host of extraHosts.split(',')) {
      const trimmed = host.trim();
      if (trimmed) {
        hosts.add(trimmed);
      }
    }
  }
  return [...hosts];
}

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine({ allowedHosts: getAllowedHosts() });

// Required for req.secure / req.protocol to reflect the original client
// scheme when running behind a reverse proxy (e.g. Azure).
app.set('trust proxy', 1);

// Lightweight health endpoint for container orchestrator probes. Registered
// before the Angular handler so it bypasses SSR and the host allowlist:
// probes hit the pod on its internal IP, whose Host header is deliberately
// not in allowedHosts, so routing them through Angular returns 400.
app.get('/healthz', (_req, res) => {
  res.status(200).send('ok');
});

app.use(
  express.json({
    verify: (req, _res, buf) => {
      (req as Request & { rawBody?: Buffer }).rawBody = buf;
    },
  }),
);
app.use('/api/gocardless', createGoCardlessRouter());

// Serve static files from /browser
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// All regular routes use the Angular engine
app.use('**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server can also be run from a serverless function by importing `reqHandler`.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Request handler used by the Angular CLI (for dev-server and during build) or Node Express server
export const reqHandler = createNodeRequestHandler(app);
