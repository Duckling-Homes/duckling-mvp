import { NextRequest, NextResponse } from 'next/server'
import AWS from 'aws-sdk'
import { PassThrough } from 'stream'
import { ImageType, constructS3ImageKey, getS3Client } from '@/app/utils/s3'

// Initialize the S3 client
const s3 = getS3Client()

export async function GET(
  request: NextRequest,
  context: any
): Promise<NextResponse | void> {
  try {
    const { id } = context.params
    const imageType: ImageType =
      (request.nextUrl.searchParams.get('type') as ImageType) || 'ORIGINAL'

    const orgContext = request.headers.get('organization-context') || ''
    const s3Key = constructS3ImageKey(orgContext, imageType, id)

    const downloadParams = {
      Bucket: process.env.UPLOAD_BUCKET || 'image-uploads',
      Key: s3Key,
    }

    const s3Object = await s3.getObject(downloadParams).promise()
    const buffer = s3Object.Body as Buffer

    return new NextResponse(buffer.buffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="${id}.jpg"`,
      },
    })
  } catch (err) {
    return new NextResponse((err as Error).message, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
