import http from 'http';
import dotenv from 'dotenv';
import { createApp } from './app.js';
import { connectDatabase } from './config/db.js';
import { logger } from './config/logger.js';

dotenv.config();

async function main() {
  const app = createApp();
  const server = http.createServer(app);

  const PORT = Number(process.env.PORT || 3000);
  const MONGO_URI = process.env.MONGO_URI || '';

  try {
    if (MONGO_URI) {
      await connectDatabase(MONGO_URI);
      logger.info('Connected to MongoDB');
    } else {
      logger.warn('MONGO_URI not set. Skipping DB connection.');
    }
  } catch (e) {
    logger.error('Failed to connect to MongoDB', { error: e?.message });
  }

  server.listen(PORT, () => {
    logger.info(`API listening on http://localhost:${PORT}`);
  });
}

main();

