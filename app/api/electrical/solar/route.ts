import { ProjectNotFoundError } from '@/app/utils/errors'
import { createProjectSolar } from '@/app/utils/repositories/electrical/solar'
import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create project solar
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const {
    id,
    location,
    ownership,
    moduleType,
    tracking,
    arrayOrientation,
    arrayTilt,
    maxPowerOutput,
    numberOfPanels,
    yearInstalled,
    annualOutput,
    notes,
    projectId,
  } = await req.json()
  const orgContext = req.headers.get('organization-context')
  const project = await getProject(projectId)

  if (!project || project.organizationId !== orgContext) {
    return NextResponse.json(new ProjectNotFoundError(projectId).toJSON())
  }
  return NextResponse.json(
    await createProjectSolar({
      id,
      location,
      ownership,
      moduleType,
      tracking,
      arrayOrientation,
      arrayTilt,
      maxPowerOutput,
      numberOfPanels,
      yearInstalled,
      annualOutput,
      notes,
      projectId,
    })
  )
})
