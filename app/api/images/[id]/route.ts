import { getImageById } from '@/app/utils/repositories/image'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'
import AWS from 'aws-sdk';

// Initialize the S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY || 'minio',
  secretAccessKey: process.env.S3_SECRET_KEY || 'minio123',
  endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

export const GET = withErrorHandler(
  async (req: NextRequest, { params: routeParams }: { params: { id: string } }) => {
    try {
      const orgContext = req.headers.get('organization-context')
      const image = await getImageById(routeParams.id, orgContext as string)

      if (!image) {
        return NextResponse.json({ message: `Image not found` }, { status: 404 })
      }

      const s3Key: string = `${orgContext}/originalSize/${routeParams.id}.jpg`;
      const s3Params = {
        Bucket: process.env.UPLOAD_BUCKET || 'image-uploads',
        Key: s3Key,
      };

      const s3Object = await s3.getObject(s3Params).promise();
      const imageBlob = s3Object.Body;

      return NextResponse.json({ image, imageBlob });
    } catch (err) {
      return new NextResponse((err as Error).message, {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
);
