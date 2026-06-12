import { test as base } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Api } from '../api/api.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKEN_PATH = path.join(__dirname, '../../../.auth/token.json');

function readToken() {
  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error('.auth/token.json not found — run tests via `npx playwright test` so globalSetup runs first');
  }
  return JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
}

export const test = base.extend({
  api: async ({ playwright, baseURL }, use) => {
    const { access_token } = readToken();
    const context = await playwright.request.newContext({
      baseURL,
      ignoreHTTPSErrors: true,
    });
    await use(new Api({ request: context, token: access_token }));
    await context.dispose();
  },
});
