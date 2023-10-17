import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'
import { getProjectEnvelopes } from '@/app/utils/repositories/envelopes/envelopes'

/**
 * Fetch envelopes for a project
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

    return NextResponse.json(await getProjectEnvelopes(params.id))
  }
)
