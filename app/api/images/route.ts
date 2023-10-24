import { createImage } from '@/app/utils/repositories/image'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'
import AWS from 'aws-sdk';
import { Readable } from 'stream';

// Initialize the S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY || 'minio',
  secretAccessKey: process.env.S3_SECRET_KEY || 'minio123',
  endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  try {
    const {
      id,
      projectId,
      photoName,
      homeownerNotes,
      internalNotes,
      associatedEntityId,
    } = await req.json();
  
    const orgContext = req.headers.get('organization-context') || '';

    // Insert into Database
    const dbImage = await createImage({
      id,
      projectId,
      photoName,
      homeownerNotes,
      internalNotes,
      associatedEntityId,
    }, orgContext);

    const imageId = dbImage.id;
    const s3Key = `${orgContext}/originalSize/${imageId}.jpg`;

    // Upload to S3
    const buffer = await req.arrayBuffer();
    const readableStream = new Readable({
      read() {
        this.push(Buffer.from(buffer));
        this.push(null);
      },
    });
  
    const uploadParams = {
      Bucket: process.env.UPLOAD_BUCKET || 'image-uploads',
      Key: s3Key,
      Body: readableStream,
    };
  
    await s3.upload(uploadParams).promise();

    return NextResponse.json({ status: 'success', s3Key, imageId });
  } catch (err) {
    return new NextResponse((err as Error).message, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
});
