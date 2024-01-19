import { ProjectNotFoundError } from '@/app/utils/errors'
import { createEnvelopeComponent } from '@/app/utils/repositories/envelopeComponent/components'
import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create Component on Project Envelope
 */
export const POST = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const {
      id,
      type,
      name,
      condition,
      location,
      notes,
      insulationCondition,
      airSealingCondition,
    } = await req.json()
    const orgContext = req.headers.get('organization-context')
    const project = await getProject(params.id)

    if (!project || project.organizationId !== orgContext) {
      return NextResponse.json(new ProjectNotFoundError(params.id).toJSON())
    }
    return NextResponse.json(
      await createEnvelopeComponent({
        id,
        type,
        name,
        condition,
        location,
        insulationCondition,
        airSealingCondition,
        notes,
        projectId: params.id,
      })
    )
  }
)
