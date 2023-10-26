import { createImage } from '@/app/utils/repositories/image'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withErrorHandler(async (req: NextRequest) => {
  const {
    id,
    projectId,
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

  // Insert into Database

  return NextResponse.json(
    await createImage(
      {
        id,
        projectId,
        name,
        homeownerNotes,
        internalNotes,
        roomId,
        envelopeId,
        applianceId,
        electricalId,
        isHeroPhoto,
      },
      orgContext
    )
  )
})

/**
 * Delete an image object
 */
export const DELETE = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')

    // Validate the organization context and image ID (if necessary)
    await validateImageProject(orgContext as string, params.id) // Uncomment and implement if necessary

    return NextResponse.json(await deleteImage(params.id, orgContext))
  }
)
