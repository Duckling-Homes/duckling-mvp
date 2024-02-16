import {
  deleteEnvelopeComponet,
  updateEnvelopeComponent,
  validateEnvelopeComponentPermission,
} from '@/app/utils/repositories/envelopeComponent/components'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Delete a project envelope component
 */
export const DELETE = withErrorHandler(
  async (
    req: NextRequest,
    { params }: { params: { id: string; componentId: string } }
  ) => {
    const orgContext = req.headers.get('organization-context')
    await validateEnvelopeComponentPermission(
      orgContext as string,
      params.id,
      params.componentId
    )

    return NextResponse.json(await deleteEnvelopeComponet(params.componentId))
  }
)

/**
 * Update a project envelope component
 */
export const PATCH = withErrorHandler(
  async (
    req: NextRequest,
    { params }: { params: { id: string; componentId: string } }
  ) => {
    const {
      type,
      name,
      location,
      condition,
      insulationCondition,
      airSealingCondition,
      notes,
    } = await req.json()

    const orgContext = req.headers.get('organization-context')
    await validateEnvelopeComponentPermission(
      orgContext as string,
      params.id,
      params.componentId
    )

    return NextResponse.json(
      await updateEnvelopeComponent(params.componentId, {
        type,
        name,
        location,
        condition,
        airSealingCondition,
        insulationCondition,
        notes,
      })
    )
  }
)
