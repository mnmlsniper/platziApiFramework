import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUTH_DIR = path.join(__dirname, '../.auth');

const ROLES = {
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@mail.com',
    password: process.env.ADMIN_PASSWORD || 'admin123',
  },
  customer: {
    email: process.env.CUSTOMER_EMAIL || 'customer@test.com',
    password: process.env.CUSTOMER_PASSWORD || 'customer123',
  },
};

export default async function globalSetup(config) {
  const { baseURL } = config.projects[0].use;

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const request = context.request;

  fs.mkdirSync(AUTH_DIR, { recursive: true });

  for (const [role, credentials] of Object.entries(ROLES)) {
    const response = await request.post(`${baseURL}auth/login`, { data: credentials });

    if (!response.ok()) {
      throw new Error(`Global setup: login failed for role "${role}" — status ${response.status()}`);
    }

    const tokens = await response.json();
    fs.writeFileSync(path.join(AUTH_DIR, `${role}.json`), JSON.stringify(tokens));
  }

  await browser.close();
}
