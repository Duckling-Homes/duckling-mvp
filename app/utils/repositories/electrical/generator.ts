import { Prisma } from '@prisma/client'
import prisma from '../../../../lib/prisma'

export async function createProjectGenerator(
  generatorData: Prisma.GeneratorUncheckedCreateInput
) {
  return await prisma.generator.create({
    data: {
      id: generatorData.id,
      generatorType: generatorData.generatorType,
      fuelType: generatorData.fuelType,
      ratedContinuousWattage: generatorData.ratedContinuousWattage,
      ratedPeakWattage: generatorData.ratedPeakWattage,
      voltage: generatorData.voltage,
      numberOfPhases: generatorData.numberOfPhases,
      transferSwitch: generatorData.transferSwitch,
      connection: generatorData.connection,
      yearInstalled: generatorData.yearInstalled,
      location: generatorData.location,
      manufacturer: generatorData.manufacturer,
      modelNumber: generatorData.modelNumber,
      serialNumber: generatorData.serialNumber,
      notes: generatorData.notes,
      project: {
        connect: {
          id: generatorData.projectId,
        },
      },
    },
  })
}

export async function updateProjectGenerator(
  id: string,
  generatorData: Prisma.GeneratorUpdateInput
) {
  return await prisma.generator.update({
    where: { id },
    data: generatorData,
  })
}

export async function deleteProjectGenerator(id: string) {
  return await prisma.generator.delete({
    where: { id },
  })
}

export async function getProjectGenerators(projectId: string) {
  return await prisma.generator.findMany({
    where: { projectId },
    orderBy: [{ createdAt: 'asc' }],
  })
}

export async function validateGeneratorProject(
  organizationId: string,
  id: string
) {
  const generator = await prisma.generator.findUnique({
    where: { id },
    include: {
      project: true,
    },
  })
  if (!generator || generator.project.organizationId != organizationId) {
    throw new Error('generator not found')
  }
}
