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
    envelopeComponentId,
    applianceId,
    electricalId,
    isHeroPhoto,
    duplicatedFromId,
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
        envelopeComponentId,
        applianceId,
        electricalId,
        isHeroPhoto,
        duplicatedFromId,
      },
      orgContext
    )
  )
})
