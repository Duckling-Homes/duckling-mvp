import { NextRequest, NextResponse } from 'next/server'
import { updateUser } from '../repository'

/**
 * Update a user
 * exmaple: curl -X PATCH http://localhost:3000/api/users/[id] -d '{"firstName":"Burton", "lastName":"Gusteri", "email":"gus@psych.com"}' -H "Content-Type: application/json"
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { firstName, lastName, email } = await req.json()

  return NextResponse.json(
    await updateUser(params.id, {
      firstName,
      lastName,
      email,
    })
  )
}
