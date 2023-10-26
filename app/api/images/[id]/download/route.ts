import { NextRequest, NextResponse } from 'next/server'
import { ImageType, constructS3ImageKey, getS3Client } from '@/app/utils/s3'
import { isImageInOrganization } from '@/app/utils/repositories/image'

// Initialize the S3 client
const s3 = getS3Client()

type ContextType = {
  params: {
    id: string
  }
}

export async function GET(
  request: NextRequest,
  context: ContextType
): Promise<NextResponse | void> {
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
