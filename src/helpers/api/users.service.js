import { validate } from '../validator.js';
import { parseBody } from '../parse-body.js';

export class UsersService {
  constructor({ request, token }) {
    this.request = request;
    this.token = token;
  }

  async getAll() {
    const response = await this.request.get('users');
    const body = await parseBody(response);
    if (response.ok()) body.forEach((u) => validate('User', u));
    return { status: response.status(), body };
  }

  async getById(id) {
    const response = await this.request.get(`users/${id}`);
    const body = await parseBody(response);
    if (response.ok()) validate('getUserById', response.status(), body);
    return { status: response.status(), body };
  }

  async create(data) {
    const response = await this.request.post('users', { data });
    const body = await parseBody(response);
    if (response.ok()) validate('createUser', response.status(), body);
    return { status: response.status(), body };
  }

  async update(id, data) {
    const response = await this.request.put(`users/${id}`, {
      data,
      headers: { Authorization: `Bearer ${this.token}` },
    });
    const body = await parseBody(response);
    if (response.ok()) validate('updateUser', response.status(), body);
    return { status: response.status(), body };
  }

  async checkEmailAvailability(email) {
    const response = await this.request.post('users/is-available', {
      data: { email },
    });
    const body = await parseBody(response);
    return { status: response.status(), body };
  }
}
