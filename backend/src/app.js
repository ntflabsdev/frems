import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { buildRouter } from './routes/index.js';
import path from 'path';

dotenv.config();

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginEmbedderPolicy: false
  }));
  const corsOptions = {
    origin: true, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  

  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(process.env.LOG_LEVEL || 'dev'));
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
  app.use('/api', buildRouter());
  return app;
}

