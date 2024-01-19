import { getProjectAppliances } from '@/app/utils/repositories/appliances/appliances'
import { getProjectElectrical } from '@/app/utils/repositories/electrical/electrical'
import { getProjectEnvelopeComponents } from '@/app/utils/repositories/envelopeComponent/components'
import { getImagesByProjectId } from '@/app/utils/repositories/image'
import { getOrganization } from '@/app/utils/repositories/organization'
import { getPlansByProjectId } from '@/app/utils/repositories/plan'
import { getProject } from '@/app/utils/repositories/project'
import { getProjectData } from '@/app/utils/repositories/projectData'
import { getProjectRooms } from '@/app/utils/repositories/projectRoom'
import { NextRequest, NextResponse } from 'next/server'

type ContextType = {
  params: {
    orgId: string
    projectId: string
  }
}

export const GET = async (req: NextRequest, context: ContextType) => {
  const { orgId, projectId } = context.params

  const project = await getProject(projectId)
  if (project?.organizationId !== orgId) {
    return new NextResponse('Not found', {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  const organization = await getOrganization(orgId)
  const projectData = await getProjectData(projectId)
  const rooms = await getProjectRooms(projectId)
  const envelopeComponents = await getProjectEnvelopeComponents(projectId)
  const appliances = await getProjectAppliances(projectId)
  const electrical = await getProjectElectrical(projectId)
  const images = await getImagesByProjectId(projectId, orgId)
  const plans = await getPlansByProjectId(projectId)

  return NextResponse.json({
    organizationName: organization?.name,
    projectDetails: {
      ...project,
      data: projectData,
      rooms,
      envelopeComponents,
      appliances,
      electrical,
      images,
      plans,
    },
  })
}
