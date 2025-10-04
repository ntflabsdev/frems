import { Schema, model, Types } from 'mongoose';

const socialLinkSchema = new Schema({
  platform: { type: String, required: true, trim: true },
  url: { type: String, required: true, trim: true }
}, { _id: false });

const brandingSchema = new Schema({
  primaryColor: { type: String, default: '#8B5CF6' },
  secondaryColor: { type: String, default: '#F3E8FF' },
  font: { type: String, default: 'Inter' },
  template: { type: String, default: 'modern' },
  logo: { type: String, default: null },
  customColors: { type: Map, of: String, default: {} },
  templateSections: { type: [String], default: [] },
  backgroundImage: { type: String, default: null },
  videoBanner: { type: String, default: null },
  productShowcase: { type: Map, of: Schema.Types.Mixed, default: {} }
}, { _id: false });

const mediaFileSchema = new Schema({
  originalName: { type: String, required: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileSize: { type: Number, required: true },
  mimeType: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  product: { type: Types.ObjectId, ref: 'Product', default: null }
}, { _id: false });

const creatorSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
  handle: { type: String, required: true, unique: true, lowercase: true, trim: true },
  bio: { type: String, index: true, default: '' },
  socialLinks: { type: [socialLinkSchema], default: [] },
  branding: { type: brandingSchema, default: {} },
  mediaLibrary: { type: [mediaFileSchema], default: [] }
}, { timestamps: true });

creatorSchema.index({ handle: 1 }, { unique: true });
creatorSchema.index({ bio: 'text' });
creatorSchema.index({ user: 1 });

export const Creator = model('Creator', creatorSchema);

