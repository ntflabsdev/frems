import { Schema, model, Types } from 'mongoose';

const adminSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, default: 'Administrator', trim: true },
  permissions: {
    type: [String],
    enum: ['ALL', 'VERIFY_CREATOR', 'MANAGE_PAYMENTS', 'VIEW_USERS'],
    default: ['ALL']
  }
}, { timestamps: true });

adminSchema.index({ user: 1 });

export const AdminModel = model('Admin', adminSchema);

