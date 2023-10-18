import {
  createHealthAndSafetyTag,
  getHealthAndSafetyTags,
} from '@/app/utils/repositories/tags/healthAndSafety'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create health and safety tag for org
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const { name } = await req.json()
  const orgContext = req.headers.get('organization-context')

  return NextResponse.json(
    await createHealthAndSafetyTag({
      name,
      organizationId: orgContext as string,
    })
  )
})

/**
 * Get health and safety tags for org
 */
export const GET = withErrorHandler(async (req: NextRequest) => {
  const orgContext = req.headers.get('organization-context')

  return NextResponse.json(await getHealthAndSafetyTags(orgContext as string))
})
