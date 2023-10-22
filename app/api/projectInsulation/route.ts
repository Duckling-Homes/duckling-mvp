import { getProject } from '@/app/utils/repositories/project'
import { createProjectInsulation } from '@/app/utils/repositories/envelopes/projectInsulation'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create project insulation
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const { name, insulationLocation, insulationCondition, notes, projectId, id } =
    await req.json()
  const orgContext = req.headers.get('organization-context')
  const project = await getProject(projectId)

  if (!project || project.organizationId !== orgContext) {
    return NextResponse.json({ message: `Project not found` }, { status: 404 })
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
