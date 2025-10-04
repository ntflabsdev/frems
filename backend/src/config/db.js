import mongoose from 'mongoose';

export async function connectDatabase(uri) {
  if (!uri) throw new Error('Missing MongoDB connection URI');
  await mongoose.connect(uri);
}

export function disconnectDatabase() {
  return mongoose.disconnect();
}

