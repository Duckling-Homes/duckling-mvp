import {
  deleteProjectAirSealing,
  getProjectAirSealingById,
  updateProjectAirSealing,
  validateProjectAirSealingPermission,
} from '@/app/utils/repositories/projectAirSealing'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Get project air sealing details
 */
export const GET = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    await validateProjectAirSealingPermission(orgContext as string, params.id)

    return NextResponse.json(await getProjectAirSealingById(params.id))
  }
)

/**
 * Delete a project air sealing object
 */
export const DELETE = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    await validateProjectAirSealingPermission(orgContext as string, params.id)

    return NextResponse.json(await deleteProjectAirSealing(params.id))
  }
)

/**
 * Update a project air sealing object
 */
export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { name, leakinessDescription, notes } = await req.json()

    const orgContext = req.headers.get('organization-context')
    await validateProjectAirSealingPermission(orgContext as string, params.id)

    return NextResponse.json(
      await updateProjectAirSealing(params.id, {
        name,
        leakinessDescription,
        notes,
      })
    )
  }
)
