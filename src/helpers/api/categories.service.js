import { validate } from '../validator.js';

export class CategoriesService {
  constructor({ request, token }) {
    this.request = request;
    this.token = token;
  }

  async getAll() {
    const response = await this.request.get('categories');
    const body = await response.json();
    if (response.ok()) validate('getCategories', response.status(), body);
    return { status: response.status(), body };
  }

  async getById(id) {
    const response = await this.request.get(`categories/${id}`);
    const body = await response.json();
    if (response.ok()) validate('getCategoryById', response.status(), body);
    return { status: response.status(), body };
  }

  async create(data) {
    const response = await this.request.post('categories', {
      data,
      headers: { Authorization: `Bearer ${this.token}` },
    });
    const body = await response.json();
    if (response.ok()) validate('createCategory', response.status(), body);
    return { status: response.status(), body };
  }

  async update(id, data) {
    const response = await this.request.put(`categories/${id}`, {
      data,
      headers: { Authorization: `Bearer ${this.token}` },
    });
    const body = await response.json();
    if (response.ok()) validate('updateCategory', response.status(), body);
    return { status: response.status(), body };
  }

  async delete(id) {
    const response = await this.request.delete(`categories/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    const body = await response.json();
    return { status: response.status(), body };
  }

  async getProductsByCategory(id) {
    const response = await this.request.get(`categories/${id}/products`);
    const body = await response.json();
    if (response.ok()) validate('getProductsByCategory', response.status(), body);
    return { status: response.status(), body };
  }
}
