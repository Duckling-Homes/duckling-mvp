import {
  deleteProjectInsulation,
  getProjectInsulation,
  updateProjectInsulation,
  validateProjectInsulationPermission,
} from '@/app/utils/repositories/projectInsulation'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Get project insulation details
 */
export const GET = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    await validateProjectInsulationPermission(orgContext as string, params.id)

    return NextResponse.json(await getProjectInsulation(params.id))
  }
)

/**
 * Delete a project insulation object
 */
export const DELETE = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    await validateProjectInsulationPermission(orgContext as string, params.id)

    return NextResponse.json(await deleteProjectInsulation(params.id))
  }
)

/**
 * Update a project insulation object
 */
export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { name, insulationLocation, insulationCondition, notes } =
      await req.json()

    const orgContext = req.headers.get('organization-context')
    await validateProjectInsulationPermission(orgContext as string, params.id)

    return NextResponse.json(
      await updateProjectInsulation(params.id, {
        name,
        insulationLocation,
        insulationCondition,
        notes,
      })
    )
  }
)
