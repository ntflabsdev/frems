import { Schema, model, Types } from 'mongoose';

const productSchema = new Schema({
  creator: { type: Types.ObjectId, ref: 'Creator', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  priceCents: { type: Number, required: true, min: 0 },
  type: { type: String, enum: ['digital', 'physical'], default: 'digital' },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  inventory: { type: Number, default: 0, min: 0 },
  downloads: { type: Number, default: 0, min: 0 },
  image: { type: String, default: '' },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export const Product = model('Product', productSchema);

