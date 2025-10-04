import { S3Client } from '@aws-sdk/client-s3';

export function createS3() {
  const region = process.env.AWS_REGION || 'us-east-1';
  const credentials = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  } : undefined;
  return new S3Client({ region, credentials });
}

