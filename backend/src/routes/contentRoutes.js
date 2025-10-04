import { Router } from 'express';
import { ContentController } from '../controllers/contentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload, uploadMultiple } from '../utils/uploader.js';

export function contentRoutes() {
  const router = Router();

  // Product management
  router.get('/:creatorId/products', authMiddleware, ContentController.getProducts);
  router.post('/:creatorId/products', authMiddleware, upload.single('image'), ContentController.createProduct);
  router.put('/products/:productId', authMiddleware, upload.single('image'), ContentController.updateProduct);
  router.delete('/products/:productId', authMiddleware, ContentController.deleteProduct);

  // Media management
  router.post('/:creatorId/media', 
    authMiddleware, 
    uploadMultiple.array('files', 10), 
    ContentController.uploadMedia
  );
  router.get('/:creatorId/media', authMiddleware, ContentController.getMediaLibrary);

  // Video banner upload
  router.post('/:creatorId/video-banner', 
    authMiddleware, 
    upload.single('video'), 
    ContentController.uploadVideoBanner
  );

  // Background image upload
  router.post('/:creatorId/background', 
    authMiddleware, 
    upload.single('image'), 
    ContentController.uploadBackgroundImage
  );

  // Analytics
  router.get('/:creatorId/analytics', authMiddleware, ContentController.getContentAnalytics);

  // Product showcase
  router.put('/:creatorId/showcase', authMiddleware, ContentController.updateProductShowcase);

  return router;
}
