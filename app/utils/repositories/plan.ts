import { Prisma } from '@prisma/client'
import prisma from '../../../lib/prisma'
import HandlerError from '../HandlerError'

/**
 * Verifies if a plan is part of a project that belongs to the specified organization.
 *
 * @param planId - The ID of the plan.
 * @param organizationId - The ID of the organization.
 * @returns True if the plan's project is in the organization, otherwise false.
 */
export async function isPlanInOrganization(
  planId: string,
  organizationId: string
): Promise<boolean> {
  const plan = await prisma.plan.findUnique({
    where: { id: planId },
    include: { project: true },
  })

  if (plan?.project.organizationId === organizationId) {
    return true
  } else {
    throw new HandlerError('Plan Not Found', 404)
  }
}

export async function createPlan(planData: Prisma.PlanUncheckedCreateInput) {
  const createdPlan = await prisma.plan.create({
    data: {
      id: planData.id,
      name: planData.name,
      project: {
        connect: {
          id: planData.projectId,
        },
      },
      planDetails: planData.planDetails,
    },
  })

  return createdPlan
}

export async function getPlansByProjectId(projectId: string) {
  return await prisma.plan.findMany({
    where: {
      projectId: projectId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getPlanById(id: string) {
  return await prisma.plan.findUnique({
    where: { id: id },
    include: { project: true },
  })
}

export async function deletePlan(id: string) {
  return await prisma.plan.delete({
    where: { id },
  })
}

export async function updatePlan(
  id: string,
  planUpdates: Prisma.PlanUncheckedUpdateInput
) {
  const plan = await prisma.plan.findUnique({
    where: { id },
  })

  if (!plan) {
    return null
  }

  return await prisma.plan.update({
    where: { id },
    data: planUpdates,
  })
}
