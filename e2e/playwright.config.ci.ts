import { defineConfig } from '@playwright/test';

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
});