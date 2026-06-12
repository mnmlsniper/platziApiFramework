import { test } from '../src/helpers/fixtures/fixture.js';
import { expect } from '@playwright/test';

test.describe('Products', () => {
  test('get all products returns array', async ({ api }) => {
    const { body } = await api.products.getAll({ limit: 10 });

    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test('get product by id', async ({ api }) => {
    const { body: list } = await api.products.getAll({ limit: 1 });
    const { body } = await api.products.getById(list[0].id);

    expect(body.id).toBe(list[0].id);
  });

  test('get non-existent product returns 400', async ({ api }) => {
    const { status } = await api.products.getById(999999);

    expect(status).toBe(400);
  });

  test('CRUD: create → update → delete', async ({ api }) => {
    const { body: product } = await api.as('admin').products.create({
      title: `Framework Test ${Date.now()}`,
      price: 99,
      description: 'Created by Playwright framework',
      categoryId: 1,
      images: ['https://placeimg.com/640/480/any'],
    });
    expect(product.id).toBeDefined();

    const { body: updated } = await api.as('admin').products.update(product.id, {
      title: 'Updated Title',
      price: 150,
      description: 'Updated by Playwright framework',
      images: ['https://placeimg.com/640/480/any'],
    });
    expect(updated.title).toBe('Updated Title');

    await api.as('admin').products.delete(product.id);
  });

  test('filter products by price range', async ({ api }) => {
    const { body } = await api.products.filterByPriceRange(10, 100);

    expect(Array.isArray(body)).toBe(true);
    body.forEach((p) => {
      expect(p.price).toBeGreaterThanOrEqual(10);
      expect(p.price).toBeLessThanOrEqual(100);
    });
  });
});
