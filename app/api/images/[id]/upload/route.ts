import { NextRequest, NextResponse } from 'next/server'
import AWS from 'aws-sdk'
import { Readable } from 'stream'

// Initialize the S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY || 'minio',
  secretAccessKey: process.env.S3_SECRET_KEY || 'minio123',
  endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
})

export async function POST(
  request: NextRequest,
  context: any
): Promise<NextResponse> {
  try {
    const { id } = context.params // Accessing the ID parameter
    const buffer = await request.arrayBuffer()
    const readableStream = new Readable({
      read() {
        this.push(Buffer.from(buffer))
        this.push(null)
      },
    })
    const orgContext = request.headers.get('organization-context') || ''
    const s3Key = constructS3ImageKey(orgContext, 'ORIGINAL', id)

    const uploadParams = {
      Bucket: process.env.UPLOAD_BUCKET || 'image-uploads',
      Key: `${id}.jpg`, // Use the ID to name the S3 object
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
