import { test, expect } from '@playwright/test';

test('homepage loads & displays Next.js', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Next.js')).toBeVisible();
});
