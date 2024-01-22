import { filterJson } from '@/app/utils/filterJson'
import { getProjectAppliances } from '@/app/utils/repositories/appliances/appliances'
import { getProjectElectrical } from '@/app/utils/repositories/electrical/electrical'
import { getProjectEnvelopeComponents } from '@/app/utils/repositories/envelopeComponent/components'
import {
  getPlanById,
  isPlanInOrganization,
} from '@/app/utils/repositories/plan'
import { getProject } from '@/app/utils/repositories/project'
import { getProjectData } from '@/app/utils/repositories/projectData'
import { getProjectRooms } from '@/app/utils/repositories/projectRoom'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withErrorHandler(
  async (
    req: NextRequest,
    { params: routeParams }: { params: { id: string } }
  ) => {
    try {
      const orgContext = req.headers.get('organization-context')
      await isPlanInOrganization(routeParams.id, orgContext as string)

      const plan = await getPlanById(routeParams.id)

      if (!plan) {
        return NextResponse.json({ message: 'Plan not found' }, { status: 404 })
      }

      const projectId = plan.projectId

      const project = await getProject(projectId)

      const projectData = await getProjectData(projectId)
      const rooms = await getProjectRooms(projectId)
      const envelopeComponents = await getProjectEnvelopeComponents(projectId)
      const appliances = await getProjectAppliances(projectId)
      const electrical = await getProjectElectrical(projectId)

      const fullProject = {
        ...project,
        data: projectData,
        rooms,
        envelopeComponents,
        appliances,
        electrical,
        planName: plan.name,
        planDetails: JSON.parse(plan.planDetails?.toString() || '{}'),
      }

      const result = filterJson(fullProject)

      const input = JSON.stringify(result)

      const systemContent = `
Task: Generate copy to include in home services proposals. The proposals are created by home services contractors recommending upgrades for a home. You will receive attributes about the home, notes from the contractor about the home and proposal, the current equipment in the home, and up to 5 plans containing upgrades the contractor recommends.

Goal: return a JSON object in the following format:
{
  "summary": "",
  "recommended": "",
  "comfort": "",
  "health": ""
}

Rules: 
1. The text for each section should be simple and plain-spoken, like you are a regular person.
2. Always use "we" instead of "I".
3. Every sections should be in paragraphs
4. The first section summary of the current state of the home. This section should be two paragraphs. The first paragraph is up to 4 concise sentences as if the contractor is talking to the homeowner. The second paragraph gives a one-sentence summary of the upgrade plan options.
5. The next section  of the recommended work. This section should be 3-5 concise sentences as if the contractor is talking to the homeowner.
6. The third section  of the comfort impacts of the recommended upgrades. The first sentence should say which project contributes to the comfort of the home, then return 3-5 bullets about the comfort improvements the homeowner should receive.
7. The fourth section  of the health impacts of the recommended upgrades. The first sentence should say which project contributes to the health of the home, then return 3-5 bullets about the health-related improvements the homeowner should receive.
8. The output should be in JSON format
`

      const messages = [
        {
          role: 'system',
          content: systemContent,
        },
        { role: 'user', content: input },
      ]

      return NextResponse.json({ ...messages })
    } catch (err) {
      return new NextResponse((err as Error).message, {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  }
)
