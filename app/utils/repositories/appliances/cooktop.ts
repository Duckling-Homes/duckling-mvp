import { Prisma } from '@prisma/client'
import prisma from '../../../../lib/prisma'

export async function createCooktopAppliance(
  cooktopData: Prisma.CooktopUncheckedCreateInput
) {
  return await prisma.cooktop.create({
    data: {
      id: cooktopData.id,
      isInduction: cooktopData.isInduction,
      fuel: cooktopData.fuel,
      age: cooktopData.age,
      manufacturer: cooktopData.manufacturer,
      modelNumber: cooktopData.modelNumber,
      serialNumber: cooktopData.serialNumber,
      location: cooktopData.location,
      notes: cooktopData.notes,
      project: {
        connect: {
          id: cooktopData.projectId,
        },
      },
    },
  })
}

export async function updateCooktopAppliance(
  id: string,
  cooktopData: Prisma.CooktopUpdateInput
) {
  return await prisma.cooktop.update({
    where: { id },
    data: cooktopData,
  })
}

export async function deleteCooktopAppliance(id: string) {
  return await prisma.cooktop.delete({
    where: { id },
  })
}

export async function getProjectCooktopAppliances(projectId: string) {
  return await prisma.cooktop.findMany({
    where: { projectId },
  })
}

export async function validateCooktopProject(
  organizationId: string,
  id: string
) {
  const cooktop = await prisma.cooktop.findUnique({
    where: { id },
    include: {
      project: true,
    },
  })
  if (!cooktop || cooktop.project.organizationId != organizationId) {
    throw new Error('cooktop appliance not found')
  }
}
