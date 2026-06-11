export class UsersService {
  constructor(request) {
    this.request = request;
    this.baseURL = 'https://api.escuelajs.co/api/v1';
  }

  async getAll() {
    return this.request.get(`${this.baseURL}/users`);
  }

  async getById(id) {
    return this.request.get(`${this.baseURL}/users/${id}`);
  }

  async create(data) {
    return this.request.post(`${this.baseURL}/users`, { data });
  }

  async update(token, id, data) {
    return this.request.put(`${this.baseURL}/users/${id}`, {
      data,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async checkEmailAvailability(email) {
    return this.request.post(`${this.baseURL}/users/is-available`, {
      data: { email },
    });
  }
}
