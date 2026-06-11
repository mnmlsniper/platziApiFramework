import { AuthService } from './auth.service.js';
import { ProductsService } from './products.service.js';
import { CategoriesService } from './categories.service.js';
import { UsersService } from './users.service.js';

export class Api {
  constructor(request) {
    this.auth = new AuthService(request);
    this.products = new ProductsService(request);
    this.categories = new CategoriesService(request);
    this.users = new UsersService(request);
  }
}
