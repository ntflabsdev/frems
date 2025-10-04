import { TransactionModel } from '../models/Transaction.js';

export const PaymentService = {
  async list() {
    return TransactionModel.find().lean();
  }
};

