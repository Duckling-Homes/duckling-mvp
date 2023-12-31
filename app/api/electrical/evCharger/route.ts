import { ProjectNotFoundError } from '@/app/utils/errors'
import { createProjectEvCharger } from '@/app/utils/repositories/electrical/evCharger'
import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create project evCharger
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const {
    id,
    chargingLevel,
    amperage,
    acPowerSourceVolatge,
    maxChargingPower,
    manufacturer,
    modelNumber,
    serialNumber,
    notes,
    projectId,
  } = await req.json()
  const orgContext = req.headers.get('organization-context')
  const project = await getProject(projectId)

  if (!project || project.organizationId !== orgContext) {
    return NextResponse.json(new ProjectNotFoundError(projectId).toJSON())
  }
  return NextResponse.json(
    await createProjectEvCharger({
      id,
      chargingLevel,
      amperage,
      acPowerSourceVolatge,
      maxChargingPower,
      manufacturer,
      modelNumber,
      serialNumber,
      notes,
      projectId,
    })
  )
})
