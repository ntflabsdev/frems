import { Creator } from '../models/Creator.js';
import mongoose from 'mongoose';
import { UserModel } from '../models/User.js';

export const CreatorService = {
  async list() {
    return Creator.find().lean();
  },

  async resolveOrCreateCreator(idOrUserId) {
    const isObjectId = mongoose.Types.ObjectId.isValid(idOrUserId);
    let creator = isObjectId ? await Creator.findById(idOrUserId) : null;
    if (creator) return creator;

    const user = isObjectId
      ? await UserModel.findById(idOrUserId)
      : await UserModel.findOne({ _id: idOrUserId }).catch(() => null);
    if (!user) return null;

    creator = await Creator.findOne({ user: user._id });
    if (creator) return creator;

    const baseHandle = (user.name || user.email || 'creator').toString().split('@')[0].replace(/\s+/g, '-').toLowerCase();
    const uniqueSuffix = Math.random().toString(36).slice(2, 7);
    const handle = `${baseHandle}-${uniqueSuffix}`;
    creator = await Creator.create({ user: user._id, handle, bio: '' });
    return creator;
  }
};

