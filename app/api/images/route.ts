import { createImage } from '@/app/utils/repositories/image'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withErrorHandler(async (req: NextRequest) => {
  const {
    id,
    projectId,
    photoName,
    homeownerNotes,
    internalNotes,
    associatedEntityId,
  } = await req.json()
  
  const orgContext = req.headers.get('organization-context')

  return NextResponse.json(
    await createImage({
      id,
      projectId,
      photoName,
      homeownerNotes,
      internalNotes,
      associatedEntityId,
      organizationContext: orgContext as string,
    })
  )
})
