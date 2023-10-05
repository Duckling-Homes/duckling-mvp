import { createUser } from './repository'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create a user
 * example: curl -X POST http://localhost:3000/api/users -d '{"firstName":"Shawn", "lastName":"Spencer", "email":"shawn@psych.com", "organizationId":"unique-id"}' -H "Content-Type: application/json"
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { firstName, lastName, email, organizationId } = await req.json()

  return NextResponse.json(
    await createUser({
      firstName,
      lastName,
      email,
      organizationId,
    })
  )
}
