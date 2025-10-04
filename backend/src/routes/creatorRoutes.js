import { Router } from 'express';
import { CreatorController } from '../controllers/creatorController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export function creatorRoutes() {
  const router = Router();
  router.get('/', authMiddleware, CreatorController.list);
  return router;
}

