import {
  createComfortTag,
  getComfortTags,
} from '@/app/utils/repositories/tags/comfort'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create comfort tag for org
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const { name } = await req.json()
  const orgContext = req.headers.get('organization-context')

  return NextResponse.json(
    await createComfortTag({
      name,
      organizationId: orgContext as string,
    })
  )
})

/**
 * Get comfort tags for org
 */
export const GET = withErrorHandler(async (req: NextRequest) => {
  const orgContext = req.headers.get('organization-context')

  return NextResponse.json(await getComfortTags(orgContext as string))
})
