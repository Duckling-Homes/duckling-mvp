import { Prisma } from '@prisma/client'
import prisma from '../../../lib/prisma'
import HandlerError from '../HandlerError'

/**
 * Verifies if a product catalogue entry is part of the specified organization.
 *
 * @param catalogueId - The ID of the product catalogue entry.
 * @param organizationId - The ID of the organization.
 * @returns True if the entry's organization is the specified one, otherwise false.
 */
export async function isProductCatalogueInOrganization(
  catalogueId: string,
  organizationId: string
): Promise<boolean> {
  const productCatalogue = await prisma.productCatalogue.findUnique({
    where: { id: catalogueId },
    include: { organization: true },
  })

  if (productCatalogue?.organizationId === organizationId) {
    return true
  } else {
    throw new HandlerError('Product Catalogue Entry Not Found', 404)
  }
}

// Get all product catalogue entries for a particular organization
export async function getProductCatalogueByOrganizationId(
  organizationId: string
) {
  return await prisma.productCatalogue.findMany({
    where: {
      organizationId,
    },
  })
}

// Get a single product catalogue entry by its ID
export async function getProductCatalogueById(
  id: string,
  organizationContext: string
) {
  const productCatalogue = await prisma.productCatalogue.findUnique({
    where: { id },
  })

  if (productCatalogue?.organizationId === organizationContext) {
    return productCatalogue
  } else {
    return null
  }
}

// Delete a product catalogue entry by its ID
export async function deleteProductCatalogue(id: string) {
  return await prisma.productCatalogue.delete({
    where: { id },
  })
}
