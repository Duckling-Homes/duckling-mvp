import withErrorHandler from '@/app/utils/withErrorHandler'
import { createUser } from '../../utils/repositories/user'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create a user
 * example: curl -X POST http://localhost:3000/api/users -d '{"firstName":"Shawn", "lastName":"Spencer", "email":"shawn@psych.com", "organizationId":"unique-id"}' -H "Content-Type: application/json"
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const { firstName, lastName, email, organizationId } = await req.json()

  return NextResponse.json(
    await createUser({
      firstName,
      lastName,
      email,
      organizationId,
    })
  )
})
