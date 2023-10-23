import { createProjectGenerator } from '@/app/utils/repositories/electrical/generator'
import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create project generator
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const {
    id,
    generatorType,
    fuelType,
    ratedContinuousWattage,
    ratedPeakWattage,
    voltage,
    numberOfPhases,
    transferSwitch,
    connection,
    yearInstalled,
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
    await createProjectGenerator({
      id,
      generatorType,
      fuelType,
      ratedContinuousWattage,
      ratedPeakWattage,
      voltage,
      numberOfPhases,
      transferSwitch,
      connection,
      yearInstalled,
      manufacturer,
      modelNumber,
      serialNumber,
      location,
      notes,
      projectId,
    })
  )
})
