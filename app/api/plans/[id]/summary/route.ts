import { getProjectAppliances } from '@/app/utils/repositories/appliances/appliances'
import { getProjectElectrical } from '@/app/utils/repositories/electrical/electrical'
import { getProjectEnvelopes } from '@/app/utils/repositories/envelopes/envelopes'
import {
  getPlanById,
  isPlanInOrganization,
} from '@/app/utils/repositories/plan'
import { getProject } from '@/app/utils/repositories/project'
import { getProjectData } from '@/app/utils/repositories/projectData'
import { getProjectRooms } from '@/app/utils/repositories/projectRoom'
import withErrorHandler from '@/app/utils/withErrorHandler'
import openai from '@/lib/ai'
import { Plan } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function getCompletion(plan: Plan) {
  console.log(plan)
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  }

  const chatCompletion: OpenAI.Chat.ChatCompletion =
    await openai.chat.completions.create(params)

  return chatCompletion.choices[0].message
}

export const GET = withErrorHandler(
  async (
    req: NextRequest,
    { params: routeParams }: { params: { id: string } }
  ) => {
    try {
      const orgContext = req.headers.get('organization-context')
      await isPlanInOrganization(routeParams.id, orgContext as string)

      // Fetch from Database
      const plan = await getPlanById(routeParams.id)

      if (!plan) {
        return NextResponse.json({ message: 'Plan not found' }, { status: 404 })
      }

      if (plan.summary) {
        return NextResponse.json({
          plan,
          summary: plan.summary,
        })
      }

      const projectId = plan.projectId

      const project = await getProject(projectId)

      const projectData = await getProjectData(projectId)
      const rooms = await getProjectRooms(projectId)
      const envelopes = await getProjectEnvelopes(projectId)
      const appliances = await getProjectAppliances(projectId)
      const electrical = await getProjectElectrical(projectId)

      const fullProject = {
        ...project,
        data: projectData,
        rooms,
        envelopes,
        appliances,
        electrical,
      }

      console.log(fullProject)

      // const summary = await getCompletion(plan, fullProject)

      const content = 'This is a stub'

      // Only return the database metadata
      return NextResponse.json({
        plan,
        summary: {
          content,
        },
      })
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
