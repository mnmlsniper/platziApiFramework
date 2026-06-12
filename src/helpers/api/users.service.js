import { validate } from '../validator.js';

export class UsersService {
  constructor({ request, token }) {
    this.request = request;
    this.token = token;
  }

  async getAll() {
    const response = await this.request.get('users');
    const body = await response.json();
    if (response.ok()) validate('getUsers', response.status(), body);
    return { response, body };
  }

  async getById(id) {
    const response = await this.request.get(`users/${id}`);
    const body = await response.json();
    if (response.ok()) validate('getUserById', response.status(), body);
    return { response, body };
  }

  async create(data) {
    const response = await this.request.post('users', { data });
    const body = await response.json();
    if (response.ok()) validate('createUser', response.status(), body);
    return { response, body };
  }

  async update(id, data) {
    const response = await this.request.put(`users/${id}`, {
      data,
      headers: { Authorization: `Bearer ${this.token}` },
    });
    const body = await response.json();
    if (response.ok()) validate('updateUser', response.status(), body);
    return { response, body };
  }

  async checkEmailAvailability(email) {
    const response = await this.request.post('users/is-available', {
      data: { email },
    });
    const body = await response.json();
    return { response, body };
  }
}
