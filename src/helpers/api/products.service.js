import { validate } from '../validator.js';

export class ProductsService {
  constructor({ request, token }) {
    this.request = request;
    this.token = token;
  }

  async getAll(params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? `products?${query}` : 'products';
    const response = await this.request.get(url);
    const body = await response.json();
    if (response.ok()) validate('getProducts', response.status(), body);
    return { response, body };
  }

  async getById(id) {
    const response = await this.request.get(`products/${id}`);
    const body = await response.json();
    if (response.ok()) validate('getProductById', response.status(), body);
    return { response, body };
  }

  async create(data) {
    const response = await this.request.post('products', {
      data,
      headers: { Authorization: `Bearer ${this.token}` },
    });
    const body = await response.json();
    if (response.ok()) validate('createProduct', response.status(), body);
    return { response, body };
  }

  async update(id, data) {
    const response = await this.request.put(`products/${id}`, {
      data,
      headers: { Authorization: `Bearer ${this.token}` },
    });
    const body = await response.json();
    if (response.ok()) validate('updateProduct', response.status(), body);
    return { response, body };
  }

  async delete(id) {
    const response = await this.request.delete(`products/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    const body = await response.json();
    return { response, body };
  }

  async filterByTitle(title) {
    const response = await this.request.get(`products/?title=${title}`);
    const body = await response.json();
    if (response.ok()) validate('getProducts', response.status(), body);
    return { response, body };
  }

  async filterByPriceRange(min, max) {
    const response = await this.request.get(`products/?price_min=${min}&price_max=${max}`);
    const body = await response.json();
    if (response.ok()) validate('getProducts', response.status(), body);
    return { response, body };
  }
}
