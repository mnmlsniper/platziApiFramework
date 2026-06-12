import { AuthService } from './auth.service.js';
import { ProductsService } from './products.service.js';
import { CategoriesService } from './categories.service.js';
import { UsersService } from './users.service.js';

export class Api {
  constructor({ request, token = null }) {
    const params = { request, token };
    this.auth = new AuthService(params);
    this.products = new ProductsService(params);
    this.categories = new CategoriesService(params);
    this.users = new UsersService(params);
  }
}
