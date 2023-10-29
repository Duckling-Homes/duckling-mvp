import { Prisma } from '@prisma/client'
import prisma from '../../../../lib/prisma'

export async function createOtherAppliance(
  otherApplianceData: Prisma.OtherApplianceUncheckedCreateInput
) {
  return await prisma.otherAppliance.create({
    data: {
      id: otherApplianceData.id,
      type: otherApplianceData.type,
      fuel: otherApplianceData.fuel,
      age: otherApplianceData.age,
      manufacturer: otherApplianceData.manufacturer,
      modelNumber: otherApplianceData.modelNumber,
      serialNumber: otherApplianceData.serialNumber,
      location: otherApplianceData.location,
      notes: otherApplianceData.notes,
      project: {
        connect: {
          id: otherApplianceData.projectId,
        },
      },
    },
  })
}

export async function updateOtherAppliance(
  id: string,
  otherApplianceData: Prisma.OtherApplianceUpdateInput
) {
  return await prisma.otherAppliance.update({
    where: { id },
    data: otherApplianceData,
  })
}

export async function deleteOtherAppliance(id: string) {
  return await prisma.otherAppliance.delete({
    where: { id },
  })
}

export async function getProjectOtherAppliances(projectId: string) {
  return await prisma.otherAppliance.findMany({
    where: { projectId },
  })
}

export async function validateOtherApplianceProject(
  organizationId: string,
  id: string
) {
  const otherAppliance = await prisma.otherAppliance.findUnique({
    where: { id },
    include: {
      project: true,
    },
  })
  if (
    !otherAppliance ||
    otherAppliance.project.organizationId != organizationId
  ) {
    throw new Error('other appliance not found')
  }
}
