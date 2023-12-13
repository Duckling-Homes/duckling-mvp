import { getFinancingOptionsByOrganizationId } from '@/app/utils/repositories/financingOptions'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withErrorHandler(async (req: NextRequest) => {
  const orgContext = req.headers.get('organization-context')
  return NextResponse.json(
    await getFinancingOptionsByOrganizationId(orgContext as string)
  )
})
