import { Product } from '../models/Product.js';

export const ProductService = {
  async list() {
    return Product.find().lean();
  }
};

