import { createWaterHeaterAppliance } from '@/app/utils/repositories/appliances/waterHeater'
import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create water heater appliance
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const {
    id,
    systemType,
    fuel,
    age,
    manufacturer,
    modelNumber,
    serialNumber,
    tankVolume,
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
    await createWaterHeaterAppliance({
      id,
      systemType,
      fuel,
      age,
      manufacturer,
      modelNumber,
      serialNumber,
      tankVolume,
      location,
      notes,
      projectId,
    })
  )
})
