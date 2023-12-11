import prisma from '../../../lib/prisma'

export async function getFinancingOptionsByOrganizationId(organizationId: string) {
  return await prisma.financingOption.findMany({
    where: {
      organizationId,
    },
  })
}

export async function getFinancingOptionById(id: string, organizationContext: string) {
  const financingOption = await prisma.financingOption.findUnique({
    where: { id },
  })

  if (financingOption?.organizationId === organizationContext) {
    return financingOption
  } else {
    return null
  }
}