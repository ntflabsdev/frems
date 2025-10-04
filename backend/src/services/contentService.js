import { Product } from '../models/Product.js';
import { Creator } from '../models/Creator.js';
import { Branding } from '../models/Branding.js';
import { buildLocalFileUrl } from '../utils/uploader.js';
import { CreatorService } from './creatorService.js';

export class ContentService {
  static toProductDTO(doc) {
    if (!doc) return null;
    const obj = doc.toObject ? doc.toObject() : doc;
    return {
      _id: obj._id,
      name: obj.title,
      description: obj.description,
      price: typeof obj.priceCents === 'number' ? Math.round(obj.priceCents) / 100 : 0,
      type: obj.type,
      status: obj.status,
      inventory: obj.inventory,
      downloads: obj.downloads,
      image: obj.image,
      creator: obj.creator,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    };
  }
  // Get creator's products
  static async getProducts(creatorId, options = {}) {
    try {
      const { page = 1, limit = 10, status, type } = options;
      const skip = (page - 1) * limit;

      let creator = await Creator.findById(creatorId);
      if (!creator) {
        creator = await CreatorService.resolveOrCreateCreator(creatorId);
        if (!creator) {
          throw new Error('Creator not found');
        }
      }

      const query = { creator: creator._id };
      if (status) query.status = status;
      if (type) query.type = type;

      const products = await Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('creator', 'name avatar');

      const total = await Product.countDocuments(query);

      return {
        products: products.map((p) => ContentService.toProductDTO(p)),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Failed to get products: ${error.message}`);
    }
  }

  // Create new product
  static async createProduct(creatorId, productData, imageFile) {
    try {
      let creator = await Creator.findById(creatorId);
      if (!creator) {
        creator = await CreatorService.resolveOrCreateCreator(creatorId);
        if (!creator) {
          throw new Error('Creator not found');
        }
      }

      const product = new Product({
        creator: creator._id,
        title: productData.name,
        description: productData.description || '',
        priceCents: Math.round((productData.price ?? 0) * 100),
        type: productData.type || 'digital',
        status: productData.status || 'draft',
        inventory: productData.inventory || 0,
        image: imageFile ? buildLocalFileUrl(imageFile.filename) : (productData.image || '')
      });

      await product.save();
      await product.populate('creator', 'name avatar');

      return ContentService.toProductDTO(product);
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  // Update product
  static async updateProduct(productId, updateData, imageFile) {
    try {
      const update = {
        updatedAt: new Date(),
      };
      if (typeof updateData.name !== 'undefined') update['title'] = updateData.name;
      if (typeof updateData.description !== 'undefined') update['description'] = updateData.description;
      if (typeof updateData.price !== 'undefined') update['priceCents'] = Math.round(updateData.price * 100);
      if (typeof updateData.type !== 'undefined') update['type'] = updateData.type;
      if (typeof updateData.status !== 'undefined') update['status'] = updateData.status;
      if (typeof updateData.inventory !== 'undefined') update['inventory'] = updateData.inventory;
      if (imageFile) update['image'] = buildLocalFileUrl(imageFile.filename);
      else if (typeof updateData.image !== 'undefined') update['image'] = updateData.image;

      const product = await Product.findByIdAndUpdate(
        productId,
        update,
        { new: true }
      ).populate('creator', 'name avatar');

      if (!product) {
        throw new Error('Product not found');
      }

      return ContentService.toProductDTO(product);
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  // Delete product
  static async deleteProduct(productId) {
    try {
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      return true;
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }

  // Upload multimedia files
  static async uploadMedia(creatorId, files, productId) {
    try {
      let creator = await Creator.findById(creatorId);
      if (!creator) {
        creator = await CreatorService.resolveOrCreateCreator(creatorId);
        if (!creator) {
          throw new Error('Creator not found');
        }
      }

      const uploadedFiles = [];
      
      for (const file of files) {
        const fileUrl = buildLocalFileUrl(file.filename);
        
        uploadedFiles.push({
          originalName: file.originalname,
          fileName: file.filename,
          fileUrl,
          fileSize: file.size,
          mimeType: file.mimetype,
          uploadedAt: new Date(),
          product: productId || null
        });
      }

      // Store in creator's media library
      if (!creator.mediaLibrary) {
        creator.mediaLibrary = [];
      }
      creator.mediaLibrary.push(...uploadedFiles);
      await creator.save();

      return uploadedFiles;
    } catch (error) {
      throw new Error(`Failed to upload media: ${error.message}`);
    }
  }

  // Get media library
  static async getMediaLibrary(creatorId, options = {}) {
    try {
      const { page = 1, limit = 20, type, productId } = options;
      const skip = (page - 1) * limit;

      let creator = await Creator.findById(creatorId);
      if (!creator) {
        creator = await CreatorService.resolveOrCreateCreator(creatorId);
        if (!creator) {
          throw new Error('Creator not found');
        }
      }

      let media = creator.mediaLibrary || [];
      
      // Filter by type if specified
      if (type) {
        media = media.filter(file => file.mimeType.startsWith(type));
      }
      if (productId) {
        media = media.filter(file => (file.product?.toString?.() || file.product) === productId);
      }

      // Sort by upload date (newest first)
      media.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

      const total = media.length;
      const paginatedMedia = media.slice(skip, skip + limit);

      return {
        media: paginatedMedia,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Failed to get media library: ${error.message}`);
    }
  }

  // Upload video banner
  static async uploadVideoBanner(creatorId, videoFile) {
    try {
      let creator = await Creator.findById(creatorId);
      if (!creator) {
        creator = await CreatorService.resolveOrCreateCreator(creatorId);
        if (!creator) {
          throw new Error('Creator not found');
        }
      }

      const videoUrl = buildLocalFileUrl(videoFile.filename);
      await Branding.findOneAndUpdate(
        { creator: creator._id },
        { $set: { videoBanner: videoUrl } },
        { new: true, upsert: true }
      );
      return videoUrl;
    } catch (error) {
      throw new Error(`Failed to upload video banner: ${error.message}`);
    }
  }

  // Upload background image
  static async uploadBackgroundImage(creatorId, imageFile) {
    try {
      const creator = await Creator.findById(creatorId);
      if (!creator) {
        throw new Error('Creator not found');
      }

      const imageUrl = buildLocalFileUrl(imageFile.filename);
      await Branding.findOneAndUpdate(
        { creator: creator._id },
        { $set: { backgroundImage: imageUrl } },
        { new: true, upsert: true }
      );
      return imageUrl;
    } catch (error) {
      throw new Error(`Failed to upload background image: ${error.message}`);
    }
  }

  // Get content analytics
  static async getContentAnalytics(creatorId, period = '30d') {
    try {
      const creator = await Creator.findById(creatorId);
      if (!creator) {
        throw new Error('Creator not found');
      }

      // Calculate date range
      const now = new Date();
      let startDate;
      
      switch (period) {
        case '7d':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case '90d':
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }

      // Get product analytics
      const totalProducts = await Product.countDocuments({ creator: creatorId });
      const publishedProducts = await Product.countDocuments({ 
        creator: creatorId, 
        status: 'published' 
      });
      const draftProducts = await Product.countDocuments({ 
        creator: creatorId, 
        status: 'draft' 
      });

      // Get recent downloads (mock data for now)
      const recentDownloads = await Product.aggregate([
        { $match: { creator: creatorId, createdAt: { $gte: startDate } } },
        { $group: { _id: null, totalDownloads: { $sum: '$downloads' } } }
      ]);

      // Get revenue data (mock data for now)
      const revenue = await Product.aggregate([
        { $match: { creator: creatorId, createdAt: { $gte: startDate } } },
        { $group: { _id: null, totalRevenue: { $sum: { $multiply: ['$priceCents', '$downloads'] } } } }
      ]);

      return {
        totalProducts,
        publishedProducts,
        draftProducts,
        totalDownloads: recentDownloads[0]?.totalDownloads || 0,
        revenue: (revenue[0]?.totalRevenue || 0) / 100,
        period,
        mediaLibrarySize: creator.mediaLibrary?.length || 0
      };
    } catch (error) {
      throw new Error(`Failed to get content analytics: ${error.message}`);
    }
  }

  // Update product showcase sections
  static async updateProductShowcase(creatorId, showcaseData) {
    try {
      const creator = await Creator.findById(creatorId);
      if (!creator) {
        throw new Error('Creator not found');
      }

      if (!creator.branding) {
        creator.branding = {};
      }
      creator.branding.productShowcase = showcaseData;
      await creator.save();

      return showcaseData;
    } catch (error) {
      throw new Error(`Failed to update product showcase: ${error.message}`);
    }
  }
}
