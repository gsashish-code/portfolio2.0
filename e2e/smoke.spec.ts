import { test, expect } from '@playwright/test'

test('boots and renders the app', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: /welcome to den/i }),
  ).toBeVisible()
})
