import { test } from '../src/helpers/fixtures/fixture.js';
import { expect } from '@playwright/test';

test.describe('Categories', () => {
  test('get all categories', async ({ api }) => {
    const { body } = await api.categories.getAll();

    expect(Array.isArray(body)).toBe(true);
  });

  test('get category by id', async ({ api }) => {
    const { body } = await api.categories.getById(1);

    expect(body.id).toBe(1);
    expect(body.name).toBeDefined();
  });

  test('get products by category', async ({ api }) => {
    const { body } = await api.categories.getProductsByCategory(1);

    expect(Array.isArray(body)).toBe(true);
  });

  test('CRUD: create → update → delete category', async ({ api }) => {
    const { body: category } = await api.as('admin').categories.create({
      name: 'Test Category',
      image: 'https://placeimg.com/640/480/any',
    });
    expect(category.id).toBeDefined();

    const { body: updated } = await api.as('admin').categories.update(category.id, {
      name: 'Updated Category',
    });
    expect(updated.name).toBe('Updated Category');

    await api.as('admin').categories.delete(category.id);
  });
});
