import { NextRequest, NextResponse } from 'next/server'
import {
  deleteOrganization,
  getOrganization,
  updateOrganization,
} from '../repository'
import withErrorHandler from '@/app/utils/withErrorHandler'

/**
 * Get an organization by id
 * exmaple: curl http://localhost:3000/api/organizations/[id]
 */
export const GET = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    return NextResponse.json(await getOrganization(params.id))
  }
)

/**
 * Delete an organization by id
 * exmaple: curl -X DELETE http://localhost:3000/api/organizations/[id]
 */
export const DELETE = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    return NextResponse.json(await deleteOrganization(params.id))
  }
)

/**
 * Update an organization
 * exmaple: curl -X PATCH http://localhost:3000/api/organizations/[id] -d '{"name":"Duckling & Co"}' -H "Content-Type: application/json"
 */
export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { name } = await req.json()

    return NextResponse.json(await updateOrganization(params.id, { name }))
  }
)
