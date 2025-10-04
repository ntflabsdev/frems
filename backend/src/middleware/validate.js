import { STATUS } from '../constants/statusCodes.js';

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse({ body: req.body, query: req.query, params: req.params });
    if (!result.success) {
      return res.status(STATUS.UNPROCESSABLE_ENTITY).json({ success: false, status: STATUS.UNPROCESSABLE_ENTITY, message: 'Validation failed', code: 'VALIDATION_ERROR', errors: result.error.flatten().fieldErrors });
    }
    next();
  };
}

