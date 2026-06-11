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
  api: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      ignoreHTTPSErrors: true,
    });
    await use(new Api(context));
    await context.dispose();
  },

  token: async ({}, use) => {
    const { access_token } = readToken();
    await use(access_token);
  },

  tokens: async ({}, use) => {
    await use(readToken());
  },
});
