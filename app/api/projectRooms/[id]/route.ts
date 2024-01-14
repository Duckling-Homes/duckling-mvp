import {
  deleteProjectRoom,
  getProjectRoom,
  updateProjectRoom,
  validateProjectRoomPermission,
} from '@/app/utils/repositories/projectRoom'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Get project room details
 */
export const GET = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    await validateProjectRoomPermission(orgContext as string, params.id)

    return NextResponse.json(await getProjectRoom(params.id))
  }
)

/**
 * Delete a project room
 */
export const DELETE = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    await validateProjectRoomPermission(orgContext as string, params.id)

    return NextResponse.json(await deleteProjectRoom(params.id))
  }
)

/**
 * Update a project room
 */
export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { name, type, floor, comfortIssueTags, safetyIssueTags, notes } =
      await req.json()
    const orgContext = req.headers.get('organization-context')
    await validateProjectRoomPermission(orgContext as string, params.id)

    return NextResponse.json(
      await updateProjectRoom(params.id, {
        name,
        type,
        floor,
        comfortIssueTags,
        safetyIssueTags,
        notes,
      })
    )
  }
)
