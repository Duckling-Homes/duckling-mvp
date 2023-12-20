import { ProjectNotFoundError } from '@/app/utils/errors'
import { createProjectAirSealing } from '@/app/utils/repositories/envelopes/projectAirSealing'
import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create project air sealing
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const { name, leakinessDescription, notes, projectId, id } = await req.json()
  const orgContext = req.headers.get('organization-context')
  const project = await getProject(projectId)

  if (!project || project.organizationId !== orgContext) {
    return NextResponse.json(new ProjectNotFoundError(projectId).toJSON())
  }
  return NextResponse.json(
    await createProjectAirSealing({
      id,
      name,
      leakinessDescription,
      notes,
      projectId,
    })
  )
})
