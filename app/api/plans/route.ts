import { createPlan } from '@/app/utils/repositories/plan'
import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withErrorHandler(async (req: NextRequest) => {
  const { id, name, projectId, planDetails } = await req.json()

  const orgContext = req.headers.get('organization-context')
  const project = await getProject(projectId)

  if (!project || project.organizationId !== orgContext) {
    return NextResponse.json({ message: `Project not found` }, { status: 404 })
  }

  return NextResponse.json(
    await createPlan({
      id,
      name,
      projectId,
      planDetails,
    })
  )
})
