import { Prisma } from '@prisma/client'
import prisma from '../../../../lib/prisma'

export async function createHVACAppliance(
  hvacData: Prisma.HVACUncheckedCreateInput
) {
  return await prisma.hVAC.create({
    data: {
      hvacSystemType: hvacData.hvacSystemType,
      havcSystem: hvacData.havcSystem,
      fuel: hvacData.fuel,
      age: hvacData.age,
      manufacturer: hvacData.manufacturer,
      modelNumber: hvacData.modelNumber,
      serialNumber: hvacData.serialNumber,
      heatingCapacity: hvacData.heatingCapacity,
      coolingCapacity: hvacData.coolingCapacity,
      location: hvacData.location,
      notes: hvacData.notes,
      project: {
        connect: {
          id: hvacData.projectId,
        },
      },
    },
  })
}

export async function updateHVACAppliance(
  id: string,
  hvacData: Prisma.HVACUpdateInput
) {
  return await prisma.hVAC.update({
    where: { id },
    data: hvacData,
  })
}

export async function deleteHVACAppliance(id: string) {
  return await prisma.hVAC.delete({
    where: { id },
  })
}

export async function getProjectHVACAppliances(projectId: string) {
  return await prisma.hVAC.findMany({
    where: { projectId },
  })
}

export async function validateHVACProject(organizationId: string, id: string) {
  const hvac = await prisma.hVAC.findUnique({
    where: { id },
    include: {
      project: true,
    },
  })
  if (!hvac || hvac.project.organizationId != organizationId) {
    throw new Error('hvac appliance not found')
  }
}
