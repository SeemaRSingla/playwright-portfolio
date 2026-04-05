import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './playwright/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 3 : undefined,
  reporter: process.env.CI
    ? [['html', { open: 'never' }], ['line']]
    : [['html'], ['list']],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 30000,
    actionTimeout: 15000,
  },
  timeout: 90000,
  projects: [
    {
      name: 'Desktop-Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'Desktop-Firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'Desktop-WebKit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  webServer: undefined,
})
