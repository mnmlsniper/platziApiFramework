import { AuthService } from './auth.service.js';
import { ProductsService } from './products.service.js';
import { CategoriesService } from './categories.service.js';
import { UsersService } from './users.service.js';
import { readTokens } from '../read-tokens.js';

export class Api {
  constructor({ request, token = null }) {
    this._request = request;
    const params = { request, token };
    this.auth = new AuthService(params);
    this.products = new ProductsService(params);
    this.categories = new CategoriesService(params);
    this.users = new UsersService(params);
  }

  as(role) {
    const { access_token } = readTokens(role);
    return new Api({ request: this._request, token: access_token });
  }

  unauthorized() {
    return new Api({ request: this._request, token: null });
  }
}
