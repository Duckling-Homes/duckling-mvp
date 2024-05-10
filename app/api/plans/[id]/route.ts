import {
  getPlanById,
  updatePlan,
  deletePlan,
  isPlanInOrganization,
} from '@/app/utils/repositories/plan'
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

      // Fetch from Database
      const plan = await getPlanById(routeParams.id)

      if (!plan) {
        return NextResponse.json({ message: 'Plan not found' }, { status: 404 })
      }

      // Only return the database metadata
      return NextResponse.json({ plan })
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

/**
 * Update a plan object
 */
export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const {
      name,
      planDetails, // Include other relevant fields for a Plan entity
      status,
      approvedAt,
      signature,
    } = await req.json()

    const orgContext = req.headers.get('organization-context')
    await isPlanInOrganization(params.id, orgContext as string)

    return NextResponse.json(
      await updatePlan(params.id, {
        name,
        planDetails, // Include other relevant fields for a Plan entity
        status,
        approvedAt,
        signature,
      })
    )
  }
)

/**
 * Delete a plan object
 */
export const DELETE = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    await isPlanInOrganization(params.id, orgContext as string)

    return NextResponse.json(await deletePlan(params.id))
  }
)
