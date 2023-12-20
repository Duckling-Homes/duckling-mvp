import { getProjectAppliances } from '@/app/utils/repositories/appliances/appliances'
import { getProjectElectrical } from '@/app/utils/repositories/electrical/electrical'
import { getProjectEnvelopes } from '@/app/utils/repositories/envelopes/envelopes'
import {
  getPlanById,
  isPlanInOrganization,
  updatePlan,
} from '@/app/utils/repositories/plan'
import { getProject } from '@/app/utils/repositories/project'
import { getProjectData } from '@/app/utils/repositories/projectData'
import { getProjectRooms } from '@/app/utils/repositories/projectRoom'
import withErrorHandler from '@/app/utils/withErrorHandler'
import openai from '@/lib/ai'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getCompletion(input: string) {
  console.log('CALLED GET COMPLETION')

  const systemContent = `You are generating copy to include in home services proposals. The proposals are created by home services contractors recommending upgrades for a home.
You will receive attributes about the home, notes from the contractor about the home and proposal, the current equipment in the home, and up to 5 plans containing upgrades the contractor recommends.
You will return four sections. The text should be simple and plain-spoken, like you are a regular person.
Some rules for the output: Always use "we" instead of "I".
The first section summary of the current state of the home. This section should be two paragraphs. The first paragraph is 5-7 concise sentences as if the contractor is talking to the homeowner. The second paragraph gives a one-sentence summary of the upgrade plan options.
The next section  of the recommended work. Create a separate paragraph for each plan and title that paragraph with the plan number. This section should be 3-5 concise sentences as if the contractor is talking to the homeowner.
The third section  of the comfort impacts of the recommended upgrades. Create a separate paragraph for each plan and title that paragraph with the plan number. The first sentence should say which project contributes to the comfort of the home, then return 3-5 bullets about the comfort improvements the homeowner should receive.
The fourth section  of the health impacts of the recommended upgrades. Create a separate paragraph for each plan and title that paragraph with the plan number. The first sentence should say which project contributes to the health of the home, then return 3-5 bullets about the health-related improvements the homeowner should receive.
Each section should be less than 200 words. The output should be in the following JSON format:
{
    "summary": "",
    "recommended": "",
    "comfort": "",
    "health": ""
}
`

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [
      {
        role: 'system',
        content: systemContent,
      },
      { role: 'user', content: input },
    ],
    model: 'gpt-3.5-turbo',
  }

  const chatCompletion: OpenAI.Chat.ChatCompletion =
    await openai.chat.completions.create(params)

  const content = chatCompletion.choices[0].message.content

  const json = content
    ? JSON.parse(content)
    : {
        summary: '',
        recommended: '',
        comfort: '',
        health: '',
      }

  return json
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterJson(inputJson: any): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const step1 = JSON.parse(
    JSON.stringify(inputJson, (k, v) => (k === 'updatedAt' ? undefined : v))
  )

  const step2 = JSON.parse(
    JSON.stringify(step1, (k, v) => (k === 'createdAt' ? undefined : v))
  )

  const step3 = JSON.parse(
    JSON.stringify(step2, (k, v) =>
      k.toLowerCase().includes('id') ? undefined : v
    )
  )

  // removing nulls

  const step4 = JSON.parse(
    JSON.stringify(step3, (k, v) => (v === null ? undefined : v))
  )

  return step4
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
        planName: plan.name,
        planDetails: JSON.parse(plan.planDetails?.toString() || '{}'),
      }

      const result = filterJson(fullProject)

      let content = {
        summary: '',
        recommended: '',
        comfort: '',
        health: '',
      }

      try {
        content = await getCompletion(JSON.stringify(result))

        await updatePlan(plan.id, {
          copy: content,
        })
      } catch (err) {
        console.log('ERROR', err)

        await updatePlan(plan.id, {
          copy: content,
        })
      }

      return NextResponse.json({ ...content })
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
