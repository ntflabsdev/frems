import { Schema, model, Types } from 'mongoose';

const brandingSchema = new Schema({
  creator: { type: Types.ObjectId, ref: 'Creator', required: true, unique: true, index: true },
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
}, { timestamps: true });

brandingSchema.index({ creator: 1 }, { unique: true });

export const Branding = model('Branding', brandingSchema);


