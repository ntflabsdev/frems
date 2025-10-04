import { ResponseHandler } from '../utils/response.js';
import { ContentService } from '../services/contentService.js';

export class ContentController {
  // Get creator's products
  static async getProducts(req, res) {
    try {
      const { creatorId } = req.params;
      const { page = 1, limit = 10, status, type } = req.query;
      
      const products = await ContentService.getProducts(creatorId, {
        page: parseInt(page),
        limit: parseInt(limit),
        status,
        type
      });
      
      return ResponseHandler.success(res, 'Products retrieved successfully', products);
    } catch (error) {
      return ResponseHandler.error(res, error.message, error.statusCode);
    }
  }

  // Create new product
  static async createProduct(req, res) {
    try {
      const { creatorId } = req.params;
      const productData = req.body;
      const imageFile = req.file;
      
      const product = await ContentService.createProduct(creatorId, productData, imageFile);
      
      return ResponseHandler.success(res, 'Product created successfully', product);
    } catch (error) {
      return ResponseHandler.error(res, error.message, error.statusCode);
    }
  }

  // Update product
  static async updateProduct(req, res) {
    try {
      const { productId } = req.params;
      const updateData = req.body;
      const imageFile = req.file;
      
      const product = await ContentService.updateProduct(productId, updateData, imageFile);
      
      return ResponseHandler.success(res, 'Product updated successfully', product);
    } catch (error) {
      return ResponseHandler.error(res, error.message, error.statusCode);
    }
  }

  // Delete product
  static async deleteProduct(req, res) {
    try {
      const { productId } = req.params;
      
      await ContentService.deleteProduct(productId);
      
      return ResponseHandler.success(res, 'Product deleted successfully');
    } catch (error) {
      return ResponseHandler.error(res, error.message, error.statusCode);
    }
  }

  // Upload multimedia files
  static async uploadMedia(req, res) {
    try {
      const { creatorId } = req.params;
      const files = req.files;
      const { productId } = req.body || {};
      
      if (!files || files.length === 0) {
        return ResponseHandler.error(res, 'No files provided', 400);
      }

      const uploadedFiles = await ContentService.uploadMedia(creatorId, files, productId);
      
      return ResponseHandler.success(res, 'Media uploaded successfully', uploadedFiles);
    } catch (error) {
      return ResponseHandler.error(res, error.message, error.statusCode);
    }
  }

  // Get media library
  static async getMediaLibrary(req, res) {
    try {
      const { creatorId } = req.params;
      const { page = 1, limit = 20, type, productId } = req.query;
      
      const media = await ContentService.getMediaLibrary(creatorId, {
        page: parseInt(page),
        limit: parseInt(limit),
        type,
        productId
      });
      
      return ResponseHandler.success(res, 'Media library retrieved successfully', media);
    } catch (error) {
      return ResponseHandler.error(res, error.message, error.statusCode);
    }
  }

  // Upload video banner
  static async uploadVideoBanner(req, res) {
    try {
      const { creatorId } = req.params;
      const videoFile = req.file;
      
      if (!videoFile) {
        return ResponseHandler.error(res, 'No video file provided', 400);
      }

      const videoUrl = await ContentService.uploadVideoBanner(creatorId, videoFile);
      
      return ResponseHandler.success(res, 'Video banner uploaded successfully', { videoUrl });
    } catch (error) {
      return ResponseHandler.error(res, error.message, error.statusCode);
    }
  }

  // Upload background image
  static async uploadBackgroundImage(req, res) {
    try {
      const { creatorId } = req.params;
      const imageFile = req.file;
      
      if (!imageFile) {
        return ResponseHandler.error(res, 'No image file provided', 400);
      }

      const imageUrl = await ContentService.uploadBackgroundImage(creatorId, imageFile);
      
      return ResponseHandler.success(res, 'Background image uploaded successfully', { imageUrl });
    } catch (error) {
      return ResponseHandler.error(res, error.message, error.statusCode);
    }
  }

  // Get content analytics
  static async getContentAnalytics(req, res) {
    try {
      const { creatorId } = req.params;
      const { period = '30d' } = req.query;
      
      const analytics = await ContentService.getContentAnalytics(creatorId, period);
      
      return ResponseHandler.success(res, 'Content analytics retrieved successfully', analytics);
    } catch (error) {
      return ResponseHandler.error(res, error.message, error.statusCode);
    }
  }

  // Update product showcase sections
  static async updateProductShowcase(req, res) {
    try {
      const { creatorId } = req.params;
      const { showcaseData } = req.body;
      
      const showcase = await ContentService.updateProductShowcase(creatorId, showcaseData);
      
      return ResponseHandler.success(res, 'Product showcase updated successfully', showcase);
    } catch (error) {
      return ResponseHandler.error(res, error.message, error.statusCode);
    }
  }
}
