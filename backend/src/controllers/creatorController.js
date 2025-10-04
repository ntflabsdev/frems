import { CreatorService } from '../services/creatorService.js';
import { STATUS } from '../constants/statusCodes.js';
import { ResponseHandler } from '../utils/response.js';

export const CreatorController = {
  async list(_req, res) {
    const creators = await CreatorService.list();
    return ResponseHandler.success(res, 'Success', creators, STATUS.OK);
  }
};

