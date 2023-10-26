import {
  getImageById,
  isImageInOrganization,
  updateImage,
} from '@/app/utils/repositories/image'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withErrorHandler(
  async (
    req: NextRequest,
    { params: routeParams }: { params: { id: string } }
  ) => {
    try {
      const orgContext = req.headers.get('organization-context') || ''

      // Fetch from Database
      const image = await getImageById(routeParams.id, orgContext)

      if (!image) {
        return NextResponse.json(
          { message: 'Image not found' },
          { status: 404 }
        )
      }

      // Only return the database metadata
      return NextResponse.json({ image })
    } catch (err) {
      return new NextResponse((err as Error).message, {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  }
)

/**
 * Update an image object
 */
export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const {
      name,
      homeownerNotes,
      internalNotes,
      roomId,
      envelopeId,
      applianceId,
      electricalId,
      isHeroPhoto,
    } = await req.json()

    const orgContext = req.headers.get('organization-context') || ''

    // Validate the organization context and image ID (if necessary)
    await isImageInOrganization(params.id, orgContext as string)

    return NextResponse.json(
      await updateImage(params.id, {
        name,
        homeownerNotes,
        internalNotes,
        roomId,
        envelopeId,
        applianceId,
        electricalId,
        isHeroPhoto,
      })
    )
  }
)
