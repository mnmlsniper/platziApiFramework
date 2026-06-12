import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUTH_DIR = path.join(__dirname, '../../.auth');

export function readTokens(role) {
  const tokenPath = path.join(AUTH_DIR, `${role}.json`);
  if (!fs.existsSync(tokenPath)) {
    throw new Error(`.auth/${role}.json not found — globalSetup не залогинился за роль "${role}"`);
  }
  return JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
}
