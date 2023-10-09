import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import { Readable } from 'stream';

// Initialize the MinIO S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.MINIO_ACCESS_KEY || 'minio',
  secretAccessKey: process.env.MINIO_SECRET_KEY || 'minio123',
  endpoint: process.env.MINIO_ENDPOINT || 'http://localhost:9000',
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const buffer = await request.arrayBuffer();
    const readableStream = new Readable({
      read() {
        this.push(Buffer.from(buffer));
        this.push(null); // Indicates end-of-file basically - the end of the stream
      },
    });

    const uploadParams = {
      Bucket: 'image-uploads',
      Key: `${Date.now()}AXELDIDIT.jpg`, // Assuming the image is a JPEG
      Body: readableStream,
    };

    const uploadResult = await s3.upload(uploadParams).promise();

    // Upload successful, return success message
    return new NextResponse(JSON.stringify({ location: uploadResult.Location }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (err) {
    // Handle error
    return new NextResponse((err as Error).message, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
