import { NextRequest, NextResponse } from 'next/server'
import AWS from 'aws-sdk'
import { Readable } from 'stream'
import { ImageType, constructS3ImageKey, getS3Client } from '@/app/utils/s3'

// Initialize the S3 client
const s3 = getS3Client()

export async function POST(
  request: NextRequest,
  context: any
): Promise<NextResponse> {
  try {
    const { id } = context.params
    const imageType: ImageType =
      (request.nextUrl.searchParams.get('type') as ImageType) || 'ORIGINAL'
    const buffer = await request.arrayBuffer()
    const readableStream = new Readable({
      read() {
        this.push(Buffer.from(buffer))
        this.push(null)
      },
    })

    const orgContext = request.headers.get('organization-context') || ''
    const s3Key = constructS3ImageKey(orgContext, imageType, id)

    const uploadParams = {
      Bucket: process.env.UPLOAD_BUCKET || 'image-uploads',
      Key: `${s3Key}.png`,
      Body: readableStream,
      ContentType: 'image/png',
    }

    const uploadResult = await s3.upload(uploadParams).promise()

    return new NextResponse(
      JSON.stringify({ location: uploadResult.Location }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (err) {
    return new NextResponse((err as Error).message, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
