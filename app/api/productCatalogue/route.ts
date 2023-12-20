import { getAggregationLimits } from '@/app/utils/repositories/aggregationLimits'
import { getProductCatalogueByOrganizationId } from '@/app/utils/repositories/productCatalogue'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withErrorHandler(async (req: NextRequest) => {
  const orgContext = req.headers.get('organization-context')

  const productCatalogue = await getProductCatalogueByOrganizationId(
    orgContext as string
  )
  const aggregationLimits = await getAggregationLimits()

  const response = NextResponse.json({
    productCatalogue,
    aggregationLimits, // Include aggregation limits in the response
  })
  response.headers.set('X-Is-Cacheable', 'true')

  return response
})
