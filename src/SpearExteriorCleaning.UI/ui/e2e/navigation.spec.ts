import { test, expect } from '@playwright/test';

test.describe('Primary navigation', () => {
  test('hamburger menu opens and closes the drawer', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Toggle navigation menu' });
    const drawer = page.locator('nav');

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(drawer.getByRole('link', { name: 'Home' })).toBeVisible();

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('clicking the backdrop closes the drawer', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
    await expect(page.getByRole('button', { name: 'Toggle navigation menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );

    await page.locator('div.fixed.inset-0.bg-custom-navy\\/40').click();
    await expect(page.getByRole('button', { name: 'Toggle navigation menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  test('Services accordion expands to reveal sub-items', async ({ page }) => {
    await page.goto('/');
    const drawer = page.locator('nav');
    await page.getByRole('button', { name: 'Toggle navigation menu' }).click();

    const servicesButton = drawer.getByRole('button', { name: 'Services' });
    await expect(servicesButton).toHaveAttribute('aria-expanded', 'false');
    await servicesButton.click();
    await expect(servicesButton).toHaveAttribute('aria-expanded', 'true');
    await expect(drawer.getByRole('link', { name: 'Window Cleaning' })).toBeVisible();
  });

  test('Handyman accordion expands to reveal sub-items', async ({ page }) => {
    await page.goto('/');
    const drawer = page.locator('nav');
    await page.getByRole('button', { name: 'Toggle navigation menu' }).click();

    const handymanButton = drawer.getByRole('button', { name: 'Handyman' });
    await handymanButton.click();
    await expect(handymanButton).toHaveAttribute('aria-expanded', 'true');
    await expect(drawer.getByRole('link', { name: 'TV Wall Mounting' })).toBeVisible();
  });

  test('Packages link scrolls to the packages section and closes the drawer', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
    await page.locator('nav').getByRole('link', { name: 'Packages' }).click();

    await expect(page).toHaveURL(/#packages$/);
    await expect(page.getByRole('button', { name: 'Toggle navigation menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  test('Set Up a Direct Debit link navigates to the direct-debit page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
    await page.locator('nav').getByRole('link', { name: 'Set Up a Direct Debit' }).click();

    await expect(page).toHaveURL(/\/direct-debit$/);
    await expect(page.getByRole('heading', { name: 'Set Up a Direct Debit' })).toBeVisible();
  });
});

test.describe('Footer', () => {
  test('accordion sections expand and collapse', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    const legalButton = footer.getByRole('button', { name: 'Legal' });

    await expect(legalButton).toHaveAttribute('aria-expanded', 'false');
    await legalButton.click();
    await expect(legalButton).toHaveAttribute('aria-expanded', 'true');
    await legalButton.click();
    await expect(legalButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('social links have accessible names and correct destinations', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');

    await expect(footer.getByRole('link', { name: 'TikTok' })).toHaveAttribute(
      'href',
      /tiktok\.com/,
    );
    await expect(footer.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
      'href',
      /instagram\.com/,
    );
    await expect(footer.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      /linkedin\.com/,
    );
    await expect(footer.getByRole('link', { name: 'Facebook' })).toHaveAttribute(
      'href',
      /facebook\.com/,
    );
  });

  test('back to top link returns to the home section', async ({ page }) => {
    await page.goto('/#gallery');
    await page.locator('footer').getByRole('link', { name: /Back to top/ }).click();
    await expect(page).toHaveURL(/#home$/);
  });
});
