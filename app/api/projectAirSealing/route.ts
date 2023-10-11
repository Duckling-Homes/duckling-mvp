import { getProject } from '@/app/utils/repositories/project'
import { createProjectAirSealing } from '@/app/utils/repositories/projectAirSealing'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create project air sealing
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const { name, leakinessDescription, notes, projectId } = await req.json()
  console.log('here')
  const orgContext = req.headers.get('organization-context')
  const project = await getProject(projectId)

  if (!project || project.organizationId !== orgContext) {
    return NextResponse.json({ message: `Project not found` }, { status: 404 })
  }
  return NextResponse.json(
    await createProjectAirSealing({
      name,
      leakinessDescription,
      notes,
      projectId,
    })
  )
})
