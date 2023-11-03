import { Prisma } from '@prisma/client'
import prisma from '../../../../lib/prisma'

export async function createProjectSolar(
  solarData: Prisma.SolarUncheckedCreateInput
) {
  return await prisma.solar.create({
    data: {
      id: solarData.id,
      location: solarData.location,
      ownership: solarData.ownership,
      moduleType: solarData.moduleType,
      tracking: solarData.tracking,
      arrayOrientation: solarData.arrayOrientation,
      arrayTilt: solarData.arrayTilt,
      maxPowerOutput: solarData.maxPowerOutput,
      numberOfPanels: solarData.numberOfPanels,
      yearInstalled: solarData.yearInstalled,
      annualOutput: solarData.annualOutput,
      notes: solarData.notes,
      project: {
        connect: {
          id: solarData.projectId,
        },
      },
    },
  })
}

export async function updateProjectSolar(
  id: string,
  solarData: Prisma.SolarUpdateInput
) {
  return await prisma.solar.update({
    where: { id },
    data: solarData,
  })
}

export async function deleteProjectSolar(id: string) {
  return await prisma.solar.delete({
    where: { id },
  })
}

export async function getAllProjectSolar(projectId: string) {
  return await prisma.solar.findMany({
    where: { projectId },
    orderBy: [{ createdAt: 'asc' }],
  })
}

export async function validateSolarProject(organizationId: string, id: string) {
  const solar = await prisma.solar.findUnique({
    where: { id },
    include: {
      project: true,
    },
  })
  if (!solar || solar.project.organizationId != organizationId) {
    throw new Error('solar not found')
  }
}
