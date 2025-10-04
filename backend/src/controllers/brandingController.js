import { ResponseHandler } from '../utils/response.js';
import { BrandingService } from '../services/brandingService.js';

export class BrandingController {
  // Get creator's branding settings
  static async getBranding(req, res) {
    try {
      const { creatorId } = req.params;
      const branding = await BrandingService.getBranding(creatorId);
      
      return ResponseHandler.success(res, 'Branding retrieved successfully', branding);
    } catch (error) {
      return ResponseHandler.error(res, error.message, error.statusCode);
    }
  }

  // Update branding settings
  static async updateBranding(req, res) {
    try {
      const { creatorId } = req.params;
      const brandingData = req.body;
      
      const updatedBranding = await BrandingService.updateBranding(creatorId, brandingData);
      
      return ResponseHandler.success(res, 'Branding updated successfully', updatedBranding);
    } catch (error) {
      return ResponseHandler.error(res, error.message, error.statusCode);
    }
  }

  // Upload logo
  static async uploadLogo(req, res) {
    try {
      const { creatorId } = req.params;
      const logoFile = req.file;
      
      if (!logoFile) {
        return ResponseHandler.error(res, 'No logo file provided', 400);
      }

      const logoUrl = await BrandingService.uploadLogo(creatorId, logoFile);
      
      return ResponseHandler.success(res, 'Logo uploaded successfully', { logoUrl });
    } catch (error) {
      return ResponseHandler.error(res, error.message, error.statusCode);
    }
  }

  // Get available Google Fonts
  static async getGoogleFonts(req, res) {
    try {
      const fonts = await BrandingService.getGoogleFonts();
      
      return ResponseHandler.success(res, 'Google Fonts retrieved successfully', fonts);
    } catch (error) {
      return ResponseHandler.error(res, error.message, error.statusCode);
    }
  }

  // Get layout templates
  static async getTemplates(req, res) {
    try {
      const templates = await BrandingService.getTemplates();
      
      return ResponseHandler.success(res, 'Templates retrieved successfully', templates);
    } catch (error) {
      return ResponseHandler.error(res, error.message, error.statusCode);
    }
  }

  // Update template sections
  static async updateTemplateSections(req, res) {
    try {
      const { creatorId } = req.params;
      const { sections } = req.body;
      
      const updatedSections = await BrandingService.updateTemplateSections(creatorId, sections);
      
      return ResponseHandler.success(res, 'Template sections updated successfully', updatedSections);
    } catch (error) {
      return ResponseHandler.error(res, error.message, error.statusCode);
    }
  }

  // Preview branding changes
  static async previewBranding(req, res) {
    try {
      const { creatorId } = req.params;
      const brandingData = req.body;
      
      const preview = await BrandingService.generatePreview(creatorId, brandingData);
      
      return ResponseHandler.success(res, 'Branding preview generated successfully', preview);
    } catch (error) {
      return ResponseHandler.error(res, error.message, error.statusCode);
    }
  }
}
