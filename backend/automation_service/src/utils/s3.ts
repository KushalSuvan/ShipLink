import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { createReadStream } from 'fs';
import { S3_BUCKET_NAME } from '../constants';

const s3Client = new S3Client();

async function uploadToS3(filepath: string): Promise<any> {
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: S3_BUCKET_NAME,
      Key: filepath,
      Body: createReadStream(filepath),
    },
  });

  try {
    const response = await upload.done();
    console.log('✅  Documents uploaded to S3');

    return response;
  } catch (err) {
    console.error('❌  FAILED to upload documents uploaded to S3');
    console.error(err);
  }
}

export { uploadToS3 };
