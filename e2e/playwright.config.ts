import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  use: {
    trace: 'on-first-retry',
    //video: 'retain-on-failure',
    launchOptions: {
      slowMo: 500,
    },
  },
  expect: {  
    timeout: 10 * 1000,
  },
  reporter: 'html',
  /*
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ]
  */
});