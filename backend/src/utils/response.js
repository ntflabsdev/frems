import { STATUS } from '../constants/statusCodes.js';

export class ResponseHandler {
  static success(res, message = 'Success', data, status = STATUS.OK) {
    return res.status(status).json({
      success: true,
      status,
      message,
      data,
    });
  }

  static error(res, message = 'Error', status = STATUS.BAD_REQUEST, errors = null, code = null) {
    return res.status(status).json({
      success: false,
      status,
      message,
      errors,
      code,
    });
  }
}