import { test } from '../src/helpers/fixtures/fixture.js';
import { expect } from '@playwright/test';

test.describe('Categories', () => {
  test('get all categories', async ({ api }) => {
    const { response, body } = await api.categories.getAll();

    expect(response.status()).toBe(200);
    expect(Array.isArray(body)).toBe(true);
  });

  test('get category by id', async ({ api }) => {
    const { response, body } = await api.categories.getById(1);

    expect(response.status()).toBe(200);
    expect(body.id).toBe(1);
    expect(body.name).toBeDefined();
  });

  test('get products by category', async ({ api }) => {
    const { response, body } = await api.categories.getProductsByCategory(1);

    expect(response.status()).toBe(200);
    expect(Array.isArray(body)).toBe(true);
  });

  test('CRUD: create → update → delete category', async ({ api }) => {
    const { response: createRes, body: category } = await api.categories.create({
      name: 'Test Category',
      image: 'https://placeimg.com/640/480/any',
    });
    expect(createRes.status()).toBe(201);
    expect(category.id).toBeDefined();

    const { response: updateRes, body: updated } = await api.categories.update(category.id, {
      name: 'Updated Category',
    });
    expect(updateRes.status()).toBe(200);
    expect(updated.name).toBe('Updated Category');

    const { response: deleteRes } = await api.categories.delete(category.id);
    expect(deleteRes.status()).toBe(200);
  });
});
