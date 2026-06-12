import { test as base } from '@playwright/test';
import { Api } from '../api/api.js';

export const test = base.extend({
  api: async ({ playwright, baseURL }, use) => {
    const context = await playwright.request.newContext({
      baseURL,
      ignoreHTTPSErrors: true,
    });
    await use(new Api({ request: context, token: null }));
    await context.dispose();
  },
});
