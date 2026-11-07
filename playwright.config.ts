import process from 'node:process';
import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: 'tests/e2e',

  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,

  reporter: isCI ? [['list'], ['html', { open: 'never' }]] : 'list',

  timeout: 30_000,

  expect: {
    timeout: 5_000,
  },

  use: {
    baseURL: 'http://localhost:3000',
    ...devices['Desktop Chrome'],

    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    launchOptions: {
      slowMo: 500,
    },
  },

  projects: [
    // Desktop
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

    // Mobile
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14'] },
    },

    // Extra Chromium-based browser configuration
    {
      name: 'edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
      },
    },
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],

  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
});
