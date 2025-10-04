import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Ensure local uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const originalName = file.originalname || 'file';
    const parts = originalName.split('.');
    const ext = parts.length > 1 ? `.${parts.pop()}` : '';
    cb(null, `${uuidv4()}${ext}`);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, _file, cb) => {
    cb(null, true);
  }
});

export const uploadMultiple = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, _file, cb) => {
    cb(null, true);
  }
});

// Helper to build public URL for a stored file
export const buildLocalFileUrl = (filename) => `/uploads/${filename}`;

