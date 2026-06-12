import { test } from '../src/helpers/fixtures/fixture.js';
import { expect } from '@playwright/test';

const ADMIN = { email: 'admin@mail.com', password: 'admin123' };

test.describe('Auth', () => {
  test('login returns access token', async ({ api }) => {
    const response = await api.auth.login(ADMIN.email, ADMIN.password);

    const body = await response.json();
    expect(body).toHaveProperty('access_token');
    expect(body).toHaveProperty('refresh_token');
  });

  test('login with wrong password returns 401', async ({ api }) => {
    const response = await api.auth.login(ADMIN.email, 'wrongpassword');

    expect(response.status()).toBe(401);
  });

  test('get profile with valid token', async ({ api }) => {
    const loginRes = await api.auth.login(ADMIN.email, ADMIN.password);
    const { access_token } = await loginRes.json();

    const profileRes = await api.auth.getProfile(access_token);
    const profile = await profileRes.json();

    expect(profile.email).toBe(ADMIN.email);
    expect(profile.role).toBe('admin');
  });

  test('get profile without token returns 401', async ({ api }) => {
    const response = await api.unauthorized().auth.getProfile('');

    expect(response.status()).toBe(401);
  });
});
