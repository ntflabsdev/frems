import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User.js';
import { Creator } from '../models/Creator.js';
import { AdminModel } from '../models/Admin.js';
import { assert, createHttpError } from '../utils/errors.js';

export const AuthService = {
  async register({ name, email, password, role = 'user', handle, bio }) {
    const existingUser = await UserModel.findOne({ email }).lean();
    assert(!existingUser, 'Email already in use', 409, 'CONFLICT');

    if (role === 'creator') {
      assert(typeof handle === 'string' && handle.trim().length >= 3, 'Creator handle required', 422, 'VALIDATION_ERROR');
      const handleExists = await Creator.exists({ handle });
      assert(!handleExists, 'Handle already taken', 409, 'CONFLICT');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = await UserModel.create({ name, email, password: hashedPassword, role });

    let creatorDoc = null;
    let adminDoc = null;
    if (role === 'creator') {
      creatorDoc = await Creator.create({ user: userDoc._id, handle, bio: bio || '' });
    }
    if (role === 'admin') {
      adminDoc = await AdminModel.create({ user: userDoc._id });
    }

    const safeUser = { id: userDoc.id, name: userDoc.name, email: userDoc.email, role: userDoc.role };
    return { user: safeUser, creatorId: creatorDoc?._id, adminId: adminDoc?._id };
  },

  async login({ email, password }) {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) throw createHttpError('Invalid credentials', 401, 'UNAUTHORIZED');
    const valid = await bcrypt.compare(password, userDoc.password);
    if (!valid) throw createHttpError('Invalid credentials', 401, 'UNAUTHORIZED');

    const nowSeconds = Math.floor(Date.now() / 1000);
    const token = jwt.sign(
      { sub: userDoc.id, role: userDoc.role, iss: 'frems-api', iat: nowSeconds },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '1h' }
    );

    const safeUser = { id: userDoc.id, name: userDoc.name, email: userDoc.email, role: userDoc.role };
    return { token, user: safeUser };
  }
};

