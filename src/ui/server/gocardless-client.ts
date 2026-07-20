const API_VERSION = '2015-07-06';

const API_BASE_URLS = {
  sandbox: 'https://api-sandbox.gocardless.com',
  live: 'https://api.gocardless.com',
} as const;

export class GoCardlessConfigError extends Error {}

export class GoCardlessApiError extends Error {
  constructor(message: string, public readonly status: number, public readonly body: unknown) {
    super(message);
  }
}

function getAccessToken(): string {
  const token = process.env['GOCARDLESS_ACCESS_TOKEN'];
  if (!token) {
    throw new GoCardlessConfigError('GOCARDLESS_ACCESS_TOKEN is not configured');
  }
  return token;
}

function getApiBaseUrl(): string {
  const environment = (process.env['GOCARDLESS_ENVIRONMENT'] ?? 'sandbox').toLowerCase();
  if (environment !== 'sandbox' && environment !== 'live') {
    throw new GoCardlessConfigError(`GOCARDLESS_ENVIRONMENT must be "sandbox" or "live", got "${environment}"`);
  }
  return API_BASE_URLS[environment];
}

export function isGoCardlessConfigured(): boolean {
  return Boolean(process.env['GOCARDLESS_ACCESS_TOKEN']);
}

export async function gcRequest<T>(path: string, body?: unknown): Promise<T> {
  const accessToken = getAccessToken();
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'GoCardless-Version': API_VERSION,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await response.text();
  const json = text ? JSON.parse(text) : undefined;

  if (!response.ok) {
    const message = json?.error?.message ?? `GoCardless API request failed with status ${response.status}`;
    throw new GoCardlessApiError(message, response.status, json);
  }

  return json as T;
}
