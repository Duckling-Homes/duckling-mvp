import { getProject } from '@/app/utils/repositories/project'
import { getProjectInsulation } from '@/app/utils/repositories/projectInsulation'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

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

    const insulations = (await getProjectInsulation(params.id)).map(
      (insulation) => {
        return { ...insulation, type: 'Insulation' }
      }
    )
    const airSealings = (await getProjectInsulation(params.id)).map(
      (airSealing) => {
        return { ...airSealing, type: 'AirSealing' }
      }
    )

    return NextResponse.json([...insulations, ...airSealings])
  }
)
