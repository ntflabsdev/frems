import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, enum: ['admin', 'user', 'creator'], default: 'user', index: true }
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });

export const UserModel = model('User', userSchema);

