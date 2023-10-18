import { Prisma } from '@prisma/client'
import prisma from '../../../../lib/prisma'

export async function createComfortTag(
  comfortTag: Prisma.ComfortTagUncheckedCreateInput
) {
  return await prisma.comfortTag.create({
    data: {
      name: comfortTag.name,
      organization: {
        connect: {
          id: comfortTag.organizationId,
        },
      },
    },
  })
}

export async function getComfortTags(organizationId: string) {
  return await prisma.comfortTag.findMany({
    where: { organizationId },
  })
}
