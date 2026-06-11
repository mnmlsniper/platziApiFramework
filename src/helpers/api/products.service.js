export class ProductsService {
  constructor(request) {
    this.request = request;
    this.baseURL = 'https://api.escuelajs.co/api/v1';
  }

  async getAll(params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${this.baseURL}/products?${query}` : `${this.baseURL}/products`;
    return this.request.get(url);
  }

  async getById(id) {
    return this.request.get(`${this.baseURL}/products/${id}`);
  }

  async create(token, data) {
    return this.request.post(`${this.baseURL}/products`, {
      data,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async update(token, id, data) {
    return this.request.put(`${this.baseURL}/products/${id}`, {
      data,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async delete(token, id) {
    return this.request.delete(`${this.baseURL}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async filterByTitle(title) {
    return this.request.get(`${this.baseURL}/products/?title=${title}`);
  }

  async filterByPriceRange(min, max) {
    return this.request.get(`${this.baseURL}/products/?price_min=${min}&price_max=${max}`);
  }
}
