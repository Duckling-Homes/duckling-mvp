import { ProjectNotFoundError } from '@/app/utils/errors'
import { createOtherAppliance } from '@/app/utils/repositories/appliances/other'
import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create other appliance
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const {
    id,
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
    return NextResponse.json(new ProjectNotFoundError(projectId).toJSON())
  }
  return NextResponse.json(
    await createOtherAppliance({
      id,
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
