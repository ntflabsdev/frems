import { Creator } from '../models/Creator.js';
import { Branding } from '../models/Branding.js';
import { buildLocalFileUrl } from '../utils/uploader.js';
import axios from 'axios';
import { CreatorService } from './creatorService.js';

export class BrandingService {
  // Get creator's branding settings
  static async getBranding(creatorId) {
    try {
      let creator = await Creator.findById(creatorId);
      if (!creator) {
        creator = await CreatorService.resolveOrCreateCreator(creatorId);
        if (!creator) {
          throw new Error('Creator not found');
        }
      }
      const branding = await Branding.findOne({ creator: creator._id });
      return {
        primaryColor: branding?.primaryColor ?? '#8B5CF6',
        secondaryColor: branding?.secondaryColor ?? '#F3E8FF',
        font: branding?.font ?? 'Inter',
        template: branding?.template ?? 'modern',
        logo: branding?.logo ?? null,
        customColors: branding?.customColors ?? {},
        templateSections: branding?.templateSections ?? [],
        backgroundImage: branding?.backgroundImage ?? null,
        videoBanner: branding?.videoBanner ?? null
      };
    } catch (error) {
      throw new Error(`Failed to get branding: ${error.message}`);
    }
  }

  // Update branding settings
  static async updateBranding(creatorId, brandingData) {
    try {
      let creator = await Creator.findById(creatorId);
      if (!creator) {
        creator = await CreatorService.resolveOrCreateCreator(creatorId);
        if (!creator) {
          throw new Error('Creator not found');
        }
      }

      const updated = await Branding.findOneAndUpdate(
        { creator: creator._id },
        { $set: { ...brandingData } },
        { new: true, upsert: true }
      );

      return updated.toObject();
    } catch (error) {
      throw new Error(`Failed to update branding: ${error.message}`);
    }
  }

  // Upload logo
  static async uploadLogo(creatorId, logoFile) {
    try {
      let creator = await Creator.findById(creatorId);
      if (!creator) {
        creator = await CreatorService.resolveOrCreateCreator(creatorId);
        if (!creator) {
          throw new Error('Creator not found');
        }
      }

      const logoUrl = buildLocalFileUrl(logoFile.filename);
      await Branding.findOneAndUpdate(
        { creator: creator._id },
        { $set: { logo: logoUrl } },
        { new: true, upsert: true }
      );
      return logoUrl;
    } catch (error) {
      throw new Error(`Failed to upload logo: ${error.message}`);
    }
  }

  // Get Google Fonts
  static async getGoogleFonts() {
    try {
      const response = await axios.get('https://www.googleapis.com/webfonts/v1/webfonts', {
        params: {
          key: process.env.GOOGLE_FONTS_API_KEY || 'AIzaSyB8QOQOQOQOQOQOQOQOQOQOQOQOQOQOQOQ'
        }
      });

      const fonts = response.data.items.map(font => ({
        name: font.family,
        family: `${font.family}, ${font.category}`,
        category: font.category,
        variants: font.variants,
        files: font.files
      }));

      return fonts;
    } catch (error) {
      // Fallback to predefined fonts if API fails
      return [
        { name: 'Inter', family: 'Inter, sans-serif', category: 'sans-serif' },
        { name: 'Roboto', family: 'Roboto, sans-serif', category: 'sans-serif' },
        { name: 'Open Sans', family: 'Open Sans, sans-serif', category: 'sans-serif' },
        { name: 'Montserrat', family: 'Montserrat, sans-serif', category: 'sans-serif' },
        { name: 'Poppins', family: 'Poppins, sans-serif', category: 'sans-serif' },
        { name: 'Lato', family: 'Lato, sans-serif', category: 'sans-serif' },
        { name: 'Source Sans Pro', family: 'Source Sans Pro, sans-serif', category: 'sans-serif' },
        { name: 'Nunito', family: 'Nunito, sans-serif', category: 'sans-serif' }
      ];
    }
  }

  // Get layout templates
  static async getTemplates() {
    return [
      {
        id: 'modern',
        name: 'Modern',
        description: 'Clean & Minimal design',
        preview: '🎨 Clean & Minimal',
        sections: [
          { id: 'hero', name: 'Hero Section', required: true },
          { id: 'about', name: 'About Section', required: false },
          { id: 'products', name: 'Products Showcase', required: true },
          { id: 'testimonials', name: 'Testimonials', required: false },
          { id: 'contact', name: 'Contact Section', required: false }
        ]
      },
      {
        id: 'classic',
        name: 'Classic',
        description: 'Traditional & Elegant design',
        preview: '📜 Traditional & Elegant',
        sections: [
          { id: 'header', name: 'Header Section', required: true },
          { id: 'hero', name: 'Hero Section', required: true },
          { id: 'about', name: 'About Section', required: true },
          { id: 'products', name: 'Products Showcase', required: true },
          { id: 'gallery', name: 'Gallery', required: false },
          { id: 'testimonials', name: 'Testimonials', required: false },
          { id: 'contact', name: 'Contact Section', required: true }
        ]
      },
      {
        id: 'creative',
        name: 'Creative',
        description: 'Bold & Artistic design',
        preview: '🎭 Bold & Artistic',
        sections: [
          { id: 'hero', name: 'Hero Section', required: true },
          { id: 'portfolio', name: 'Portfolio Showcase', required: true },
          { id: 'products', name: 'Products Section', required: true },
          { id: 'process', name: 'Creative Process', required: false },
          { id: 'testimonials', name: 'Client Reviews', required: false },
          { id: 'contact', name: 'Get In Touch', required: false }
        ]
      }
    ];
  }

  // Update template sections
  static async updateTemplateSections(creatorId, sections) {
    try {
      let creator = await Creator.findById(creatorId);
      if (!creator) {
        creator = await CreatorService.resolveOrCreateCreator(creatorId);
        if (!creator) {
          throw new Error('Creator not found');
        }
      }
      await Branding.findOneAndUpdate(
        { creator: creator._id },
        { $set: { templateSections: sections } },
        { new: true, upsert: true }
      );
      return sections;
    } catch (error) {
      throw new Error(`Failed to update template sections: ${error.message}`);
    }
  }

  // Generate branding preview
  static async generatePreview(creatorId, brandingData) {
    try {
      const creator = await Creator.findById(creatorId);
      if (!creator) {
        throw new Error('Creator not found');
      }
      const branding = await Branding.findOne({ creator: creator._id });
      // Generate preview data
      const preview = {
        creatorName: creator.name,
        creatorBio: creator.bio,
        primaryColor: brandingData.primaryColor || branding?.primaryColor || '#8B5CF6',
        secondaryColor: brandingData.secondaryColor || branding?.secondaryColor || '#F3E8FF',
        font: brandingData.font || branding?.font || 'Inter',
        template: brandingData.template || branding?.template || 'modern',
        logo: brandingData.logo || branding?.logo,
        backgroundImage: brandingData.backgroundImage || branding?.backgroundImage,
        videoBanner: brandingData.videoBanner || branding?.videoBanner,
        previewUrl: `/preview/${creatorId}?t=${Date.now()}`
      };

      return preview;
    } catch (error) {
      throw new Error(`Failed to generate preview: ${error.message}`);
    }
  }
}
