export class AuthService {
  constructor({ request }) {
    this.request = request;
  }

  async login(email, password) {
    return this.request.post('auth/login', {
      data: { email, password },
    });
  }

  async getProfile(token) {
    return this.request.get('auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async refreshToken(refreshToken) {
    return this.request.post('auth/refresh-token', {
      data: { refreshToken },
    });
  }
}
