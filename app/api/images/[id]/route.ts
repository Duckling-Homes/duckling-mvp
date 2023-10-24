import { getImageById } from '@/app/utils/repositories/image'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    const image = await getImageById(params.id, orgContext as string)

    if (!image) {
      return NextResponse.json({ message: `Image not found` }, { status: 404 })
    }

    return NextResponse.json(image)
  }
)
