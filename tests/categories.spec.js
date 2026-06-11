import { test } from '../src/helpers/fixtures/fixture.js';
import { expect } from '@playwright/test';

test.describe('Categories', () => {
  test('get all categories', async ({ api }) => {
    const response = await api.categories.getAll();

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test('get category by id', async ({ api }) => {
    const response = await api.categories.getById(1);

    expect(response.status()).toBe(200);
    const category = await response.json();
    expect(category).toHaveProperty('id', 1);
    expect(category).toHaveProperty('name');
  });

  test('get products by category', async ({ api }) => {
    const response = await api.categories.getProductsByCategory(1);

    expect(response.status()).toBe(200);
    const products = await response.json();
    expect(Array.isArray(products)).toBe(true);
  });

  test('CRUD: create → update → delete category', async ({ api, token }) => {
    const created = await api.categories.create(token, {
      name: 'Test Category',
      image: 'https://placeimg.com/640/480/any',
    });
    expect(created.status()).toBe(201);
    const category = await created.json();
    expect(category).toHaveProperty('id');

    const updated = await api.categories.update(token, category.id, { name: 'Updated Category' });
    expect(updated.status()).toBe(200);
    const updatedCat = await updated.json();
    expect(updatedCat.name).toBe('Updated Category');

    const deleted = await api.categories.delete(token, category.id);
    expect(deleted.status()).toBe(200);
  });
});
