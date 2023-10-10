import { NextRequest, NextResponse } from 'next/server'
import { getUser, updateUser } from '../../../utils/repositories/user'
import withErrorHandler from '@/app/utils/withErrorHandler'

/**
 * Get a user by id
 * exmaple: curl http://localhost:3000/api/users/[id]
 */
export const GET = withErrorHandler(
  async (_req: NextRequest, { params }: { params: { id: string } }) => {
    return NextResponse.json(await getUser(params.id))
  }
)

/**
 * Update a user
 * exmaple: curl -X PATCH http://localhost:3000/api/users/[id] -d '{"firstName":"Burton", "lastName":"Guster", "email":"gus@psych.com"}' -H "Content-Type: application/json"
 */
export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { firstName, lastName, email } = await req.json()

    return NextResponse.json(
      await updateUser(params.id, {
        firstName,
        lastName,
        email,
      })
    )
  }
)
