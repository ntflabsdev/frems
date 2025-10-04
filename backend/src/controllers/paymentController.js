import { PaymentService } from '../services/paymentService.js';
import { STATUS } from '../constants/statusCodes.js';
import { ResponseHandler } from '../utils/response.js';

export const PaymentController = {
  async listTransactions(_req, res) {
    const txs = await PaymentService.list();
    return ResponseHandler.success(res, 'Success', txs, STATUS.OK);
  }
};

