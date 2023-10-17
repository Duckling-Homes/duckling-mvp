import { Prisma } from '@prisma/client'
import prisma from '../../../../lib/prisma'

export async function createProjectBattery(
  batteryData: Prisma.BatteryUncheckedCreateInput
) {
  return await prisma.battery.create({
    data: {
      totalCapacity: batteryData.totalCapacity,
      ratedPowerOutput: batteryData.ratedPowerOutput,
      ratedPeakOutput: batteryData.ratedPeakOutput,
      voltage: batteryData.voltage,
      gridConnected: batteryData.gridConnected,
      manufacturer: batteryData.manufacturer,
      modelNumber: batteryData.modelNumber,
      serialNumber: batteryData.serialNumber,
      notes: batteryData.notes,
      project: {
        connect: {
          id: batteryData.projectId,
        },
      },
    },
  })
}

export async function updateProjectBattery(
  id: string,
  batteryData: Prisma.BatteryUpdateInput
) {
  return await prisma.battery.update({
    where: { id },
    data: batteryData,
  })
}

export async function deleteProjectBattery(id: string) {
  return await prisma.battery.delete({
    where: { id },
  })
}

export async function getProjectBatterys(projectId: string) {
  return await prisma.battery.findMany({
    where: { projectId },
  })
}

export async function validateBatteryProject(
  organizationId: string,
  id: string
) {
  const battery = await prisma.battery.findUnique({
    where: { id },
    include: {
      project: true,
    },
  })
  if (!battery || battery.project.organizationId != organizationId) {
    throw new Error('battery not found')
  }
}
