import { test, expect } from '@playwright/test';

test.describe('Gallery lightbox', () => {
  test('opens on thumbnail click and closes via the close button', async ({ page }) => {
    await page.goto('/#gallery');
    const gallery = page.locator('#gallery');
    const firstThumbnail = gallery.getByRole('button', { name: /View enlarged/ }).first();
    await firstThumbnail.scrollIntoViewIfNeeded();
    await firstThumbnail.click();

    const closeButton = page.getByRole('button', { name: 'Close image' });
    await expect(closeButton).toBeVisible();
    await expect(page.getByAltText(/project photo enlarged/)).toBeVisible();

    await closeButton.click();
    await expect(closeButton).not.toBeVisible();
  });

  test('closes on Escape key press', async ({ page }) => {
    await page.goto('/#gallery');
    const gallery = page.locator('#gallery');
    const firstThumbnail = gallery.getByRole('button', { name: /View enlarged/ }).first();
    await firstThumbnail.scrollIntoViewIfNeeded();
    await firstThumbnail.click();

    await expect(page.getByRole('button', { name: 'Close image' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Close image' })).not.toBeVisible();
  });
});
