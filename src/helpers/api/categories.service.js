export class CategoriesService {
  constructor(request) {
    this.request = request;
    this.baseURL = 'https://api.escuelajs.co/api/v1';
  }

  async getAll() {
    return this.request.get(`${this.baseURL}/categories`);
  }

  async getById(id) {
    return this.request.get(`${this.baseURL}/categories/${id}`);
  }

  async create(token, data) {
    return this.request.post(`${this.baseURL}/categories`, {
      data,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async update(token, id, data) {
    return this.request.put(`${this.baseURL}/categories/${id}`, {
      data,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async delete(token, id) {
    return this.request.delete(`${this.baseURL}/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getProductsByCategory(id) {
    return this.request.get(`${this.baseURL}/categories/${id}/products`);
  }
}
