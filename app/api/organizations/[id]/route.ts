import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'
import {
  deleteOrganization,
  getOrganization,
  updateOrganization,
} from '../../../utils/repositories/organization'

/**
 * Get an organization by id
 * exmaple: curl http://localhost:3000/api/organizations/[id]
 */
/**
 * @swagger
 * /organization/{id}:
 *   get:
 *     summary: Get organization by ID
 *     description: Retrieves an organization by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the organization to retrieve.
 *     responses:
 *       200:
 *         description: Successful response containing the organization data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "/Users/rahulpatni/dev/duckling/app/api/organizations/[id]/swagger.yaml#/components/schemas/Organization"
 *       404:
 *         description: Organization not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the organization was not found.
 *               example:
 *                 message: Organization not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating an internal server error.
 *               example:
 *                 message: Internal server error.
 *
 */

export const GET = withErrorHandler(
  async (_req: NextRequest, { params }: { params: { id: string } }) => {
    return NextResponse.json(await getOrganization(params.id))
  }
)

/**
 * Delete an organization by id
 * exmaple: curl -X DELETE http://localhost:3000/api/organizations/[id]
 */
export const DELETE = withErrorHandler(
  async (_req: NextRequest, { params }: { params: { id: string } }) => {
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
