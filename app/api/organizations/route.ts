import { NextRequest, NextResponse } from 'next/server'
import { createOrganization, getOrganizations } from './repository'
import withErrorHandler from '@/app/utils/withErrorHandler'

/**
 * Create an organization
 * example: curl -X POST http://localhost:3000/api/organizations -d '{"name":"Duckling Inc."}' -H "Content-Type: application/json"
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const { name } = await req.json()

  return NextResponse.json(await createOrganization({ name }))
})

/**
 * Get all organizations
 * exmaple: curl http://localhost:3000/api/organizations
 */
export const GET = withErrorHandler(async (_req: NextRequest) => {
  return NextResponse.json(await getOrganizations())
})
