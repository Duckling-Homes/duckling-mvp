import { ProjectNotFoundError } from '@/app/utils/errors'
import { createProjectInsulation } from '@/app/utils/repositories/envelopes/projectInsulation'
import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create project insulation
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const {
    name,
    insulationLocation,
    insulationCondition,
    notes,
    projectId,
    id,
  } = await req.json()
  const orgContext = req.headers.get('organization-context')
  const project = await getProject(projectId)

  if (!project || project.organizationId !== orgContext) {
    return NextResponse.json(new ProjectNotFoundError(projectId).toJSON())
  }
  return NextResponse.json(
    await createProjectInsulation({
      id,
      name,
      insulationLocation,
      insulationCondition,
      notes,
      projectId,
    })
  )
})
