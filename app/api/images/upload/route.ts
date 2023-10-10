import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import { Readable } from 'stream';

// Initialize the S3 client (points to minio for local dev which is all it does for now)
const s3 = new AWS.S3({
  // Fallback to local values. These point to minio for now
  accessKeyId: process.env.S3_ACCESS_KEY || 'minio',
  secretAccessKey: process.env.S3_SECRET_KEY || 'minio123',
  endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const buffer = await request.arrayBuffer();
    const readableStream = new Readable({
      read() {
        this.push(Buffer.from(buffer));
        this.push(null);
      },
    });

    const uploadParams = {
      Bucket: process.env.UPLOAD_BUCKET || 'image-uploads',
      // TODO: tenant this, definitely add the org and image id as the key
      Key: `${Date.now()}.jpg`, // Assuming the image is a JPEG
      Body: readableStream,
    };

    const uploadResult = await s3.upload(uploadParams).promise();

    // Upload successful, return success message. TODO fix to return image id, probably
    return new NextResponse(JSON.stringify({ location: uploadResult.Location }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (err) {
    return new NextResponse((err as Error).message, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
