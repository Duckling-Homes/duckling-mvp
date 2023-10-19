import { createGoalTag, getGoalTags } from '@/app/utils/repositories/tags/goals'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create goal tag for org
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const { name } = await req.json()
  const orgContext = req.headers.get('organization-context')

  return NextResponse.json(
    await createGoalTag({
      name,
      organizationId: orgContext as string,
    })
  )
})

/**
 * Get goal tags for org
 */
export const GET = withErrorHandler(async (req: NextRequest) => {
  const orgContext = req.headers.get('organization-context')

  return NextResponse.json(await getGoalTags(orgContext as string))
})
