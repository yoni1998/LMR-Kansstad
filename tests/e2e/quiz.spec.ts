import { expect, test } from '@playwright/test';

test.describe('Quiz page', () => {
  test('loads the home page successfully', async ({ page }) => {
    const response = await page.goto('/');

    // HTTP response
    expect(response?.status()).toBe(200);

    // Page content
    await expect(page.getByRole('main')).toContainText('LMR-KANSSTAD');
  });
});
