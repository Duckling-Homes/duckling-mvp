import {
  isImageInOrganization,
  validImageTypes,
} from '@/app/utils/repositories/image'
import { ImageType, constructS3ImageKey, getS3Client } from '@/app/utils/s3'
import { NextRequest, NextResponse } from 'next/server'
import { Readable } from 'stream'

// Initialize the S3 client
const s3 = getS3Client()

type ContextType = {
  params: {
    id: string
  }
}

export async function POST(
  request: NextRequest,
  context: ContextType
): Promise<NextResponse> {
  try {
    const { id } = context.params
    const orgContext = request.headers.get('organization-context') || ''
    if (!(await isImageInOrganization(id, orgContext))) {
      return new NextResponse('Not found', {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
    const imageType: ImageType =
      (request.nextUrl.searchParams.get('type') as ImageType) || 'ORIGINAL'
    if (!validImageTypes.includes(imageType)) {
      return new NextResponse('Type param must be ORIGINAL or CROPPED', {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
    const buffer = await request.arrayBuffer()
    const readableStream = new Readable({
      read() {
        this.push(Buffer.from(buffer))
        this.push(null)
      },
    })

    const s3Key = constructS3ImageKey(orgContext, imageType, id)

    const uploadParams = {
      Bucket: process.env.UPLOAD_BUCKET || 'image-uploads',
      Key: s3Key,
      Body: readableStream,
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
