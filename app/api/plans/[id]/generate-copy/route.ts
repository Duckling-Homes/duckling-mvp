import { filterJson } from '@/app/utils/filterJson'
import { getProjectAppliances } from '@/app/utils/repositories/appliances/appliances'
import { getProjectElectrical } from '@/app/utils/repositories/electrical/electrical'
import { getProjectEnvelopeComponents } from '@/app/utils/repositories/envelopeComponent/components'
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

export const maxDuration = 100

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getCompletion(input: string) {
  const systemContent = `
Task: Generate copy to include in home services proposals. The proposals are created by home services contractors recommending upgrades for a home. The proposals are used to build trust with the customer and clearly explain the benefits from these recommendations. You will receive attributes about the home, notes from the contractor about the home and proposal, the current equipment in the home, and a plan containing upgrades the contractor recommends.

The first section is called "Plan Summary". This section contains one paragraph that summarizes what catalog items are included in the plan. If the work replaces or augments any envelop components, appliances, or electrical work from the project, also reference that. Only use the sub-category names to describe the items included.

The second section is called "Comfort". This section is up to two paragraphs to describe the comfort benefits of the work included in this plan. If there are any comfort issue tags or notes that are addressed by the plan, include a reference to those.  When you reference the work, only include the subcategory or names of the catalog items.  

The third section is called "Health". This section is up to two paragraphs to describe the health and safety benefits of the work included in this plan. If there are any health and safety issue tags or notes that are addressed by the plan, include a reference to those. When you reference the work, only include the subcategory or names of the catalog items.  

The fourth section is called "Other", which is the "recommeneded" section of the JSON object. This section is up to two paragraphs to describe the other benefits of the work included in this plan. The other benefits include things like greater resiliency, lower utility bills, or climate impacts. Only include information about climate impacts if the homeowner goals tag or notes contain a reference to that. If there are any relevant homeowner goal tags or notes that are addressed by the plan, include a reference to those. When you reference the work, only include the subcategory or names of the catalog items.

Goal: return a JSON object in the following format:
{
  "summary": "",
  "comfort": "",
  "health": "",
  "recommended": ""
}

Rules: 
1. The text for each section should be simple and plain-spoken, like you are a regular person.
2. Do not oversell or sound too salesy. The contactor is a trusted partner for the homeowner.
3. Always use "we" instead of "I".
4. Always use words like "you" or "your" instead of "homeowner" or "customer".
5. The output should be in JSON format
`

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [
      {
        role: 'system',
        content: systemContent,
      },
      { role: 'user', content: input },
    ],
    model: 'gpt-4-0125-preview',
    response_format: {
      type: 'json_object',
    },
  }

  const chatCompletion = await openai.chat.completions.create(params)

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

// https://vercel.com/docs/functions/configuring-functions/duration

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

      let content = {
        summary: '',
        recommended: '',
        comfort: '',
        health: '',
      }

      try {
        content = await getCompletion(JSON.stringify(result))
        console.log(content)
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
