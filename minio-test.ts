import * as AWS from 'aws-sdk';
import * as fs from 'fs';

// Ensure test.txt exists in the same directory as the script.
if (!fs.existsSync('test.txt')) {
  fs.writeFileSync('test.txt', 'Hello, world!');
}

// Environment variables
const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || 'http://localhost:9000';
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY || 'minio';
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY || 'minio123';

// Initialize the MinIO S3 client
const s3 = new AWS.S3({
  accessKeyId: MINIO_ACCESS_KEY,
  secretAccessKey: MINIO_SECRET_KEY,
  endpoint: MINIO_ENDPOINT,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

// Upload parameters
const uploadParams = {
  Bucket: 'image-uploads',
  Key: 'test.txt',
  Body: fs.createReadStream('test.txt'),
};

// Upload the file to the MinIO bucket
s3.upload(uploadParams, (err, data) => {
  if (err) {
    console.log('Upload Error:', err);
  }
  if (data) {
    console.log('Upload Success:', data.Location);
  }
});

// List all objects in the MinIO bucket
const listParams = {
  Bucket: 'image-uploads',  // Corrected bucket name to match uploadParams
};

s3.listObjects(listParams, (err, data) => {
  if (err) {
    console.log('List Error:', err);
  }
  if (data) {
    console.log('Bucket List:', data.Contents);
  }
});
