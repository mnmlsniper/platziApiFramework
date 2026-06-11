import { test } from '../src/helpers/fixtures/fixture.js';
import { expect } from '@playwright/test';

test.describe('Products', () => {
  test('get all products returns array', async ({ api }) => {
    const response = await api.products.getAll({ limit: 10 });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test('get product by id', async ({ api }) => {
    const listRes = await api.products.getAll({ limit: 1 });
    const [first] = await listRes.json();

    const response = await api.products.getById(first.id);

    expect(response.status()).toBe(200);
    const product = await response.json();
    expect(product).toHaveProperty('id', first.id);
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
  });

  test('get non-existent product returns 400', async ({ api }) => {
    const response = await api.products.getById(999999);

    expect(response.status()).toBe(400);
  });

  test('CRUD: create → update → delete', async ({ api, token }) => {
    const created = await api.products.create(token, {
      title: `Framework Test ${Date.now()}`,
      price: 99,
      description: 'Created by Playwright framework',
      categoryId: 1,
      images: ['https://placeimg.com/640/480/any'],
    });
    expect(created.status()).toBe(201);
    const product = await created.json();
    expect(product).toHaveProperty('id');

    const updated = await api.products.update(token, product.id, {
      title: 'Updated Title',
      price: 150,
      description: 'Updated by Playwright framework',
      images: ['https://placeimg.com/640/480/any'],
    });
    expect(updated.status()).toBe(200);
    const updatedProduct = await updated.json();
    expect(updatedProduct.title).toBe('Updated Title');

    const deleted = await api.products.delete(token, product.id);
    expect(deleted.status()).toBe(200);
  });

  test('filter products by price range', async ({ api }) => {
    const response = await api.products.filterByPriceRange(10, 100);

    expect(response.status()).toBe(200);
    const products = await response.json();
    expect(Array.isArray(products)).toBe(true);
    products.forEach((p) => {
      expect(p.price).toBeGreaterThanOrEqual(10);
      expect(p.price).toBeLessThanOrEqual(100);
    });
  });
});
