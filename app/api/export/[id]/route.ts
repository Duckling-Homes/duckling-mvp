import { getProjectAppliances } from '@/app/utils/repositories/appliances/appliances'
import { getProjectElectrical } from '@/app/utils/repositories/electrical/electrical'
import { getProjectEnvelopes } from '@/app/utils/repositories/envelopes/envelopes'
import { getPlansByProjectId } from '@/app/utils/repositories/plan'
import { getProject } from '@/app/utils/repositories/project'
import { getProjectData } from '@/app/utils/repositories/projectData'
import { getProjectRooms } from '@/app/utils/repositories/projectRoom'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const project = await getProject(params.id)

    const projectData = await getProjectData(params.id)
    const rooms = await getProjectRooms(params.id)
    const envelopes = await getProjectEnvelopes(params.id)
    const appliances = await getProjectAppliances(params.id)
    const electrical = await getProjectElectrical(params.id)
    const plans = await getPlansByProjectId(params.id)

    return NextResponse.json({
      ...project,
      data: projectData,
      rooms,
      envelopes,
      appliances,
      electrical,
      plans,
    })
  }
)
