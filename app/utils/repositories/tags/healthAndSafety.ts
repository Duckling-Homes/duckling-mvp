import { Prisma } from '@prisma/client'
import prisma from '../../../../lib/prisma'

export async function createHealthAndSafetyTag(
  healthAndSafetyTag: Prisma.HealthAndSafetyTagUncheckedCreateInput
) {
  return await prisma.healthAndSafetyTag.create({
    data: {
      name: healthAndSafetyTag.name,
      organization: {
        connect: {
          id: healthAndSafetyTag.organizationId,
        },
      },
    },
  })
}

export async function getHealthAndSafetyTags(organizationId: string) {
  return await prisma.healthAndSafetyTag.findMany({
    where: { organizationId },
  })
}
