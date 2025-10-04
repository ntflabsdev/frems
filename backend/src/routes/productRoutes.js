import { Router } from 'express';
import { ProductController } from '../controllers/productController.js';

export function productRoutes() {
  const router = Router();
  router.get('/', ProductController.list);
  return router;
}

