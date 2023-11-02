import { Prisma } from '@prisma/client'
import prisma from '../../../../lib/prisma'

export async function createWaterHeaterAppliance(
  waterHeaterData: Prisma.WaterHeaterUncheckedCreateInput
) {
  return await prisma.waterHeater.create({
    data: {
      id: waterHeaterData.id,
      tankVolume: waterHeaterData.tankVolume,
      systemType: waterHeaterData.systemType,
      fuel: waterHeaterData.fuel,
      age: waterHeaterData.age,
      manufacturer: waterHeaterData.manufacturer,
      modelNumber: waterHeaterData.modelNumber,
      serialNumber: waterHeaterData.serialNumber,
      location: waterHeaterData.location,
      notes: waterHeaterData.notes,
      project: {
        connect: {
          id: waterHeaterData.projectId,
        },
      },
    },
  })
}

export async function updateWaterHeaterAppliance(
  id: string,
  waterHeaterData: Prisma.WaterHeaterUpdateInput
) {
  return await prisma.waterHeater.update({
    where: { id },
    data: waterHeaterData,
  })
}

export async function deleteWaterHeaterAppliance(id: string) {
  return await prisma.waterHeater.delete({
    where: { id },
  })
}

export async function getProjectWaterHeaterAppliances(projectId: string) {
  return await prisma.waterHeater.findMany({
    where: { projectId },
    orderBy: [{ createdAt: 'asc' }],
  })
}

export async function validateWaterHeaterProject(
  organizationId: string,
  id: string
) {
  const waterHeater = await prisma.waterHeater.findUnique({
    where: { id },
    include: {
      project: true,
    },
  })
  if (!waterHeater || waterHeater.project.organizationId != organizationId) {
    throw new Error('water heater appliance not found')
  }
}
