import { AuthService } from '../services/authService.js';
import { STATUS } from '../constants/statusCodes.js';
import { ResponseHandler } from '../utils/response.js';

export const AuthController = {
  async register(req, res, next) {
    try {
      const { name, email, password, role, handle, bio } = req.body || {};
      const user = await AuthService.register({ name, email, password, role, handle, bio });
      return ResponseHandler.success(res, 'Created', { user }, STATUS.CREATED);
    } catch (e) {
      return next(e);
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body || {};
      const result = await AuthService.login({ email, password });
      return ResponseHandler.success(res, 'Success', result, STATUS.OK);
    } catch (e) {
      return ResponseHandler.error(
        res,
        e?.message || 'Invalid credentials',
        e?.status || STATUS.UNAUTHORIZED,
        null,
        e?.code || 'UNAUTHORIZED'
      );
    }
  }
};

