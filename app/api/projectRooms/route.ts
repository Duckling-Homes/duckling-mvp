import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'
import { getProject } from '../../utils/repositories/project'
import { createProjectRoom } from '@/app/utils/repositories/projectRoom'

/**
 * Create a project room
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const {
    id,
    name,
    type,
    width,
    length,
    ceilingHeight,
    floor,
    usage,
    comfortIssueTags,
    safetyIssueTags,
    notes,
    projectId,
  } = await req.json()

  const orgContext = req.headers.get('organization-context')
  const project = await getProject(projectId)

  if (!project || project.organizationId !== orgContext) {
    return NextResponse.json({ message: `Project not found` }, { status: 404 })
  }

  return NextResponse.json(
    await createProjectRoom({
      id,
      name,
      type,
      width,
      length,
      ceilingHeight,
      floor,
      usage,
      comfortIssueTags,
      safetyIssueTags,
      notes,
      projectId,
    })
  )
})
