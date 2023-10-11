import { Prisma } from '@prisma/client'
import prisma from '../../../lib/prisma'

export async function createProjectInsulation(
  insulationData: Prisma.ProjectInsulationUncheckedCreateInput
) {
  return await prisma.projectInsulation.create({
    data: {
      name: insulationData.name,
      insulationLocation: insulationData.insulationLocation,
      insulationCondition: insulationData.insulationCondition,
      notes: insulationData.notes,
      project: {
        connect: {
          id: insulationData.projectId,
        },
      },
    },
  })
}

export async function updateProjectInsulation(
  id: string,
  insulationUpdates: Prisma.ProjectInsulationUpdateInput
) {
  return await prisma.projectInsulation.update({
    where: { id },
    data: insulationUpdates,
  })
}

export async function deleteProjectInsulation(id: string) {
  return await prisma.projectInsulation.delete({
    where: { id },
  })
}

export async function getProjectInsulationById(id: string) {
  return await prisma.projectInsulation.findUnique({
    where: { id },
  })
}

export async function getProjectInsulation(projectId: string) {
  return await prisma.projectInsulation.findMany({
    where: { projectId },
  })
}

export async function validateProjectInsulationPermission(
  organizationId: string,
  id: string
) {
  const projectInsulation = await prisma.projectInsulation.findUnique({
    where: { id },
    include: {
      project: true,
    },
  })
  if (
    !projectInsulation ||
    projectInsulation.project.organizationId != organizationId
  ) {
    throw new Error('projectInsulation not found')
  }
}
