import { ProjectNotFoundError } from '@/app/utils/errors'
import { createProjectBattery } from '@/app/utils/repositories/electrical/battery'
import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create battery electrical
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const {
    id,
    totalCapacity,
    ratedPowerOutput,
    ratedPeakOutput,
    voltage,
    gridConnected,
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
    await createProjectBattery({
      id,
      totalCapacity,
      ratedPowerOutput,
      ratedPeakOutput,
      voltage,
      gridConnected,
      manufacturer,
      modelNumber,
      serialNumber,
      notes,
      projectId,
    })
  )
})
