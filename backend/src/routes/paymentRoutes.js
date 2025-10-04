import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export function paymentRoutes() {
  const router = Router();
  router.get('/transactions', authMiddleware, PaymentController.listTransactions);
  return router;
}

