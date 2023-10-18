import { Prisma } from '@prisma/client'
import prisma from '../../../../lib/prisma'

export async function createGoalTag(
  goalTag: Prisma.GoalTagUncheckedCreateInput
) {
  return await prisma.goalTag.create({
    data: {
      name: goalTag.name,
      organization: {
        connect: {
          id: goalTag.organizationId,
        },
      },
    },
  })
}

export async function getGoalTags(organizationId: string) {
  return await prisma.goalTag.findMany({
    where: { organizationId },
  })
}
