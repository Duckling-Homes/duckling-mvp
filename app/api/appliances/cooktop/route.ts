import { createCooktopAppliance } from '@/app/utils/repositories/appliances/cooktop'
import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create cooktop appliance
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const {
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
    return NextResponse.json({ message: `Project not found` }, { status: 404 })
  }
  return NextResponse.json(
    await createCooktopAppliance({
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
