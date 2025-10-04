import { Schema, model, Types } from 'mongoose';

const transactionSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  product: { type: Types.ObjectId, ref: 'Product', required: true },
  amountCents: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' }
}, { timestamps: true });

export const TransactionModel = model('Transaction', transactionSchema);

