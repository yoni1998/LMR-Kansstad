import { expect, test } from '@playwright/test';

test.describe('Quiz page', () => {
  test('loads the quiz page successfully', async ({ page }) => {
    const response = await page.goto('/');

    // HTTP response
    expect(response?.status()).toBe(200);
  });
});
