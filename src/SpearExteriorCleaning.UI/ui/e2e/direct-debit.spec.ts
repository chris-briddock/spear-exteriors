import { test, expect } from '@playwright/test';

/**
 * The /direct-debit page is fully client-rendered (no data fetched during
 * SSR), so mocking `page.route()` reliably intercepts the button-click API
 * call. /direct-debit/complete, however, fetches during SSR (it's rendered
 * per-request, not prerendered - see app.routes.server.ts), so a browser-side
 * route mock never sees that request. Its specs below instead rely on the
 * fact that a fake redirect_flow_id deterministically produces the app's
 * "error" state regardless of environment: either GoCardless isn't
 * configured (503 from our own API) or, if it is, the real GoCardless API
 * rejects the fabricated id (502) - both map to the same error UI.
 */

test.describe('Direct Debit setup page', () => {
  test('renders the setup page with a call to action', async ({ page }) => {
    await page.goto('/direct-debit');
    await expect(page.getByRole('heading', { name: 'Set Up a Direct Debit' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Set Up a Direct Debit' })).toBeVisible();
  });

  test('redirects to GoCardless when the API call succeeds', async ({ page }) => {
    await page.route('**/api/gocardless/redirect-flows', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ redirectUrl: 'https://example.com/e2e-mock-gocardless-flow' }),
      });
    });

    await page.goto('/direct-debit');
    await page.getByRole('button', { name: 'Set Up a Direct Debit' }).click();
    await page.waitForURL('https://example.com/e2e-mock-gocardless-flow');
  });

  test('shows a graceful error with a fallback contact when the API call fails', async ({ page }) => {
    await page.route('**/api/gocardless/redirect-flows', async (route) => {
      await route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Direct Debit setup is not available right now.' }),
      });
    });

    await page.goto('/direct-debit');
    await page.getByRole('button', { name: 'Set Up a Direct Debit' }).click();

    await expect(page.getByRole('alert')).toContainText('Something went wrong');
    await expect(page.getByRole('link', { name: /call us on 07498 070462/ })).toHaveAttribute(
      'href',
      'tel:+447498070462',
    );
  });
});

test.describe('Direct Debit completion page', () => {
  test('shows a friendly message when no redirect flow id is present', async ({ page }) => {
    await page.goto('/direct-debit/complete');
    await expect(page.getByRole('heading', { name: 'No Direct Debit setup found' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Set Up a Direct Debit' })).toHaveAttribute(
      'href',
      '/direct-debit',
    );
  });

  test('shows an error state for an unrecognized redirect flow id', async ({ page }) => {
    await page.goto('/direct-debit/complete?redirect_flow_id=e2e-test-invalid-id');
    await expect(
      page.getByRole('heading', { name: "We couldn't confirm your Direct Debit" }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Try Again' })).toHaveAttribute('href', '/direct-debit');
    await expect(page.getByRole('link', { name: /Call 07498 070462/ })).toHaveAttribute(
      'href',
      'tel:+447498070462',
    );
  });
});
