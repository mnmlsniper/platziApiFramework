export class AuthService {
  constructor(request) {
    this.request = request;
    this.baseURL = 'https://api.escuelajs.co/api/v1';
  }

  async login(email, password) {
    return this.request.post(`${this.baseURL}/auth/login`, {
      data: { email, password },
    });
  }

  async getProfile(token) {
    return this.request.get(`${this.baseURL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async refreshToken(refreshToken) {
    return this.request.post(`${this.baseURL}/auth/refresh-token`, {
      data: { refreshToken },
    });
  }
}
