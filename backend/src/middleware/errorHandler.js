import { STATUS } from '../constants/statusCodes.js';

export function notFoundHandler(_req, res) {
  res.status(STATUS.NOT_FOUND).json({ success: false, status: STATUS.NOT_FOUND, message: 'Route not found', code: 'NOT_FOUND' });
}

export function globalErrorHandler(err, _req, res, _next) {
  if (err?.name === 'ZodError') {
    return res.status(STATUS.UNPROCESSABLE_ENTITY).json({ success: false, status: STATUS.UNPROCESSABLE_ENTITY, message: 'Validation failed', code: 'VALIDATION_ERROR', errors: err.flatten?.().fieldErrors });
  }
  const status = err?.status || STATUS.INTERNAL_SERVER_ERROR;
  const code = err?.code || 'INTERNAL_ERROR';
  const message = err?.message || 'Internal server error';
  return res.status(status).json({ success: false, status, message, code, errors: err?.details });
}

