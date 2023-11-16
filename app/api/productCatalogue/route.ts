import { getProductCatalogueByOrganizationId } from '@/app/utils/repositories/productCatalogue'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withErrorHandler(async (req: NextRequest) => {
  const orgContext = req.headers.get('organization-context')

  const response = NextResponse.json(
    await getProductCatalogueByOrganizationId(orgContext as string)
  )
  response.headers.set('X-Is-Cacheable', 'true')

  return response
})
