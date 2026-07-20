import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has the expected title and hero content', async ({ page }) => {
    await expect(page).toHaveTitle(/Spear Exterior Cleaning/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Enhance Your Home.s Beauty/);
    await expect(page.locator('#home').getByRole('link', { name: /Call 07498 070462/ })).toHaveAttribute(
      'href',
      'tel:+447498070462',
    );
  });

  test('renders every major section in order', async ({ page }) => {
    const sectionIds = ['home', 'services', 'packages', 'about', 'gallery', 'contact'];
    for (const id of sectionIds) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test('services section lists cleaning and handyman services', async ({ page }) => {
    const services = page.locator('#services');
    await expect(services.getByRole('heading', { name: 'Our Services' })).toBeVisible();
    await expect(services.getByRole('heading', { name: 'Window Cleaning' })).toBeVisible();
    await expect(services.getByRole('heading', { name: 'Handyman Services' })).toBeVisible();
    await expect(services.getByRole('heading', { name: 'Flat Pack Furniture Building' })).toBeVisible();
  });

  test('packages section lists all four tiers with prices', async ({ page }) => {
    const packages = page.locator('#packages');
    await expect(packages.getByRole('heading', { name: 'Bronze' })).toBeVisible();
    await expect(packages.getByText('£120')).toBeVisible();
    await expect(packages.getByRole('heading', { name: 'Silver' })).toBeVisible();
    await expect(packages.getByText('£185')).toBeVisible();
    await expect(packages.getByRole('heading', { name: 'Gold' })).toBeVisible();
    await expect(packages.getByText('£300')).toBeVisible();
    await expect(packages.getByRole('heading', { name: 'Diamond' })).toBeVisible();
    await expect(packages.getByText('£800')).toBeVisible();
  });

  test('contact section exposes phone and email links', async ({ page }) => {
    const contact = page.locator('#contact');
    await expect(contact.getByRole('link', { name: /Call 07498 070462/ })).toHaveAttribute(
      'href',
      'tel:+447498070462',
    );
    await expect(contact.getByRole('link', { name: /spearexteriors\.co\.uk/ })).toHaveAttribute(
      'href',
      'mailto:info@spearexteriors.co.uk',
    );
  });
});
