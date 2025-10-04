// routes/brandingRoutes.js
import { Router } from 'express';
import { BrandingController } from '../controllers/brandingController.js';
import { authMiddleware } from '../middleware/authMiddleware.js'; // Changed to authMiddleware
import { upload } from '../utils/uploader.js';

export function brandingRoutes() {
  const router = Router();

  // Get creator's branding settings
  router.get('/:creatorId', authMiddleware, BrandingController.getBranding);

  // Update branding settings
  router.put('/:creatorId', authMiddleware, BrandingController.updateBranding);

  // Upload logo
  router.post('/:creatorId/logo', 
    authMiddleware, 
    upload.single('logo'), 
    BrandingController.uploadLogo
  );

  // Get Google Fonts
  router.get('/fonts/google', BrandingController.getGoogleFonts);

  // Get layout templates
  router.get('/templates', BrandingController.getTemplates);

  // Update template sections
  router.put('/:creatorId/sections', authMiddleware, BrandingController.updateTemplateSections);

  // Preview branding changes
  router.post('/:creatorId/preview', authMiddleware, BrandingController.previewBranding);

  return router;
}