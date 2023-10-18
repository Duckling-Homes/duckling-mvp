import { createHVACAppliance } from '@/app/utils/repositories/appliances/hvac'
import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create hvac appliance
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const {
    hvacSystemType,
    havcSystem,
    fuel,
    age,
    manufacturer,
    modelNumber,
    serialNumber,
    heatingCapacity,
    coolingCapacity,
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
    await createHVACAppliance({
      hvacSystemType,
      havcSystem,
      fuel,
      age,
      manufacturer,
      modelNumber,
      serialNumber,
      heatingCapacity,
      coolingCapacity,
      location,
      notes,
      projectId,
    })
  )
})
