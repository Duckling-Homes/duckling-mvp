import { ProjectNotFoundError } from '@/app/utils/errors'
import { createCooktopAppliance } from '@/app/utils/repositories/appliances/cooktop'
import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create cooktop appliance
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const {
    id,
    fuel,
    age,
    manufacturer,
    modelNumber,
    serialNumber,
    isInduction,
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
    await createCooktopAppliance({
      id,
      fuel,
      age,
      manufacturer,
      modelNumber,
      serialNumber,
      isInduction,
      location,
      notes,
      projectId,
    })
  )
})
