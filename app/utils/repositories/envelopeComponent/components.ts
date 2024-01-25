import { Prisma } from '@prisma/client'
import prisma from '../../../../lib/prisma'

export async function createEnvelopeComponent(
  componentData: Prisma.ProjectEnvelopeComponentUncheckedCreateInput
) {
  return await prisma.projectEnvelopeComponent.create({
    data: {
      id: componentData.id,
      type: componentData.type,
      name: componentData.name,
      condition: componentData.condition,
      location: componentData.location,
      insulationCondition: componentData.insulationCondition,
      airSealingCondition: componentData.airSealingCondition,
      notes: componentData.notes,
      project: {
        connect: {
          id: componentData.projectId,
        },
      },
    },
  })
}

export async function updateEnvelopeComponent(
  id: string,
  componentUpdates: Prisma.ProjectEnvelopeComponentUpdateInput
) {
  return await prisma.projectEnvelopeComponent.update({
    where: { id },
    data: componentUpdates,
  })
}

export async function deleteEnvelopeComponet(id: string) {
  return await prisma.projectEnvelopeComponent.delete({
    where: { id },
  })
}

export async function getEnvelopeComponentById(id: string) {
  return await prisma.projectEnvelopeComponent.findUnique({
    where: { id },
  })
}

export async function getProjectEnvelopeComponents(projectId: string) {
  return await prisma.projectEnvelopeComponent.findMany({
    where: { projectId },
    orderBy: [{ createdAt: 'asc' }],
  })
}

export async function validateEnvelopeComponentPermission(
  organizationId: string,
  projectId: string,
  id: string
) {
  const projectEnvelopeComponent =
    await prisma.projectEnvelopeComponent.findUnique({
      where: { id },
      include: {
        project: true,
      },
    })
  if (
    !projectEnvelopeComponent ||
    projectEnvelopeComponent.project.id != projectId ||
    projectEnvelopeComponent.project.organizationId != organizationId
  ) {
    throw new Error('projectEnvelopeComponent not found')
  }
}
