import { getProject } from '@/app/utils/repositories/project'
import { getProjectRooms } from '@/app/utils/repositories/projectRoom'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Fetch rooms for a project
 */
export const GET = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    const project = await getProject(params.id)

    if (!project || project.organizationId !== orgContext) {
      return NextResponse.json(
        { message: `Project not found` },
        { status: 404 }
      )
    }

    return NextResponse.json(await getProjectRooms(params.id))
  }
)
