import { test, expect } from '@playwright/test';

// One snapshot per surface. If a change is intentional, refresh with: pnpm test:visual --update-snapshots
const ROUTES: Array<[string, string]> = [
  ['overview', '#/overview'],
  ['expressions', '#/expressions'],
  ['gallery', '#/gallery'],
  ['app', '#/app'],
  ['landing', '#/landing'],
];

for (const [name, hash] of ROUTES) {
  test(`visual: ${name}`, async ({ page }) => {
    await page.goto(`/${hash}`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true, animations: 'disabled' });
  });
}
