import { Router } from 'express';
import { authRoutes } from './authRoutes.js';
import { creatorRoutes } from './creatorRoutes.js';
import { productRoutes } from './productRoutes.js';
import { paymentRoutes } from './paymentRoutes.js';
import { brandingRoutes } from './brandingRoutes.js';
import { contentRoutes } from './contentRoutes.js';

export function buildRouter() {
  const router = Router();
  router.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  router.use('/auth', authRoutes());
  router.use('/creators', creatorRoutes());
  router.use('/products', productRoutes());
  router.use('/payments', paymentRoutes());
  router.use('/branding', brandingRoutes());
  router.use('/content', contentRoutes());

  return router;
}

