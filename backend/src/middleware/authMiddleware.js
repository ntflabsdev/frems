// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import { STATUS } from '../constants/statusCodes.js';

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(STATUS.UNAUTHORIZED).json({ success: false, status: STATUS.UNAUTHORIZED, message: 'Missing token' });
  }
  const token = header.slice('Bearer '.length);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.user = payload;
    next();
  } catch {
    return res.status(STATUS.UNAUTHORIZED).json({ success: false, status: STATUS.UNAUTHORIZED, message: 'Invalid token' });
  }
}