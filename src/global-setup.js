import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKEN_PATH = path.join(__dirname, '../.auth/token.json');

export default async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const request = context.request;

  const response = await request.post('https://api.escuelajs.co/api/v1/auth/login', {
    data: {
      email: process.env.ADMIN_EMAIL || 'admin@mail.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
    },
  });

  if (!response.ok()) {
    throw new Error(`Global setup: login failed with status ${response.status()}`);
  }

  const { access_token, refresh_token } = await response.json();

  fs.mkdirSync(path.dirname(TOKEN_PATH), { recursive: true });
  fs.writeFileSync(TOKEN_PATH, JSON.stringify({ access_token, refresh_token }));

  await browser.close();
}
