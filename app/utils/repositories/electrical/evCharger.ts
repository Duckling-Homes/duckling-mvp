import { Prisma } from '@prisma/client'
import prisma from '../../../../lib/prisma'

export async function createProjectEvCharger(
  evChargerData: Prisma.EvChargerUncheckedCreateInput
) {
  return await prisma.evCharger.create({
    data: {
      id: evChargerData.id,
      chargingLevel: evChargerData.chargingLevel,
      amperage: evChargerData.amperage,
      acPowerSourceVolatge: evChargerData.acPowerSourceVolatge,
      maxChargingPower: evChargerData.maxChargingPower,
      manufacturer: evChargerData.manufacturer,
      modelNumber: evChargerData.modelNumber,
      serialNumber: evChargerData.serialNumber,
      notes: evChargerData.notes,
      project: {
        connect: {
          id: evChargerData.projectId,
        },
      },
    },
  })
}

export async function updateProjectEvCharger(
  id: string,
  evChargerData: Prisma.EvChargerUpdateInput
) {
  return await prisma.evCharger.update({
    where: { id },
    data: evChargerData,
  })
}

export async function deleteProjectEvCharger(id: string) {
  return await prisma.evCharger.delete({
    where: { id },
  })
}

export async function getProjectEvChargers(projectId: string) {
  return await prisma.evCharger.findMany({
    where: { projectId },
    orderBy: [{ createdAt: 'asc' }],
  })
}

export async function validateEvChargerProject(
  organizationId: string,
  id: string
) {
  const evCharger = await prisma.evCharger.findUnique({
    where: { id },
    include: {
      project: true,
    },
  })
  if (!evCharger || evCharger.project.organizationId != organizationId) {
    throw new Error('evCharger not found')
  }
}
