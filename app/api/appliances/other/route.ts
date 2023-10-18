import { createOtherAppliance } from '@/app/utils/repositories/appliances/other'
import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create other appliance
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const {
    type,
    fuel,
    age,
    manufacturer,
    modelNumber,
    serialNumber,
    location,
    notes,
    projectId,
  } = await req.json()
  const orgContext = req.headers.get('organization-context')
  const project = await getProject(projectId)

  if (!project || project.organizationId !== orgContext) {
    return NextResponse.json({ message: `Project not found` }, { status: 404 })
  }
  return NextResponse.json(
    await createOtherAppliance({
      type,
      fuel,
      age,
      manufacturer,
      modelNumber,
      serialNumber,
      location,
      notes,
      projectId,
    })
  )
})
