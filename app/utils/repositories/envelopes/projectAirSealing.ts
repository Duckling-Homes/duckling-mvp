import { Prisma } from '@prisma/client'
import prisma from '../../../../lib/prisma'

export async function createProjectAirSealing(
  airSealingData: Prisma.ProjectAirSealingUncheckedCreateInput
) {
  return await prisma.projectAirSealing.create({
    data: {
      id: airSealingData.id,
      name: airSealingData.name,
      leakinessDescription: airSealingData.leakinessDescription,
      notes: airSealingData.notes,
      project: {
        connect: {
          id: airSealingData.projectId,
        },
      },
    },
  })
}

export async function updateProjectAirSealing(
  id: string,
  airSealingUpdates: Prisma.ProjectAirSealingUpdateInput
) {
  return await prisma.projectAirSealing.update({
    where: { id },
    data: airSealingUpdates,
  })
}

export async function deleteProjectAirSealing(id: string) {
  return await prisma.projectAirSealing.delete({
    where: { id },
  })
}

export async function getProjectAirSealingById(id: string) {
  return await prisma.projectAirSealing.findUnique({
    where: { id },
  })
}

export async function getProjectAirSealing(projectId: string) {
  return await prisma.projectAirSealing.findMany({
    where: { projectId },
  })
}

export async function validateProjectAirSealingPermission(
  organizationId: string,
  id: string
) {
  const projectAirSealing = await prisma.projectAirSealing.findUnique({
    where: { id },
    include: {
      project: true,
    },
  })
  if (
    !projectAirSealing ||
    projectAirSealing.project.organizationId != organizationId
  ) {
    throw new Error('projectAirSealing not found')
  }
}
