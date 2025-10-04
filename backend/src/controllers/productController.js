import { ProductService } from '../services/productService.js';
import { STATUS } from '../constants/statusCodes.js';
import { ResponseHandler } from '../utils/response.js';

export const ProductController = {
  async list(_req, res) {
    const products = await ProductService.list();
    return ResponseHandler.success(res, 'Success', products, STATUS.OK);
  }
};

