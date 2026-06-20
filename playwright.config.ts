import { defineConfig, devices } from '@playwright/test';

// Visual-regression: screenshots of every demo route gate the kit's own PRs, so a token or
// component change cannot silently restyle the system. Baselines live next to the spec, suffixed
// by platform (regenerate in the CI container with --update-snapshots when an intended change lands).
export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
  use: { baseURL: 'http://localhost:4180' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } } },
  ],
  webServer: {
    command: 'pnpm --filter @olivekit/demo exec vite --port 4180 --strictPort',
    url: 'http://localhost:4180',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
