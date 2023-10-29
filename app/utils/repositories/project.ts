import { Prisma } from '@prisma/client'
import prisma from '../../../lib/prisma'

export async function createProject(
  projectData: Prisma.ProjectUncheckedCreateInput
) {
  return await prisma.project.create({
    data: {
      id: projectData.id,
      name: projectData.name,
      homeownerName: projectData.homeownerName,
      homeownerPhone: projectData.homeownerPhone,
      homeownerEmail: projectData.homeownerEmail,
      homeownerAddress: projectData.homeownerAddress,
      organization: {
        connect: {
          id: projectData.organizationId,
        },
      },
    },
  })
}

export async function getProjects(organizationId: string) {
  return await prisma.project.findMany({
    where: { organizationId },
  })
}

export async function getProject(id: string) {
  return await prisma.project.findUnique({
    where: { id },
  })
}

export async function deleteProject(id: string) {
  return await prisma.project.delete({
    where: { id },
  })
}

export async function updateProject(
  id: string,
  projectUpdates: Prisma.ProjectUpdateInput
) {
  return await prisma.project.update({
    where: { id },
    data: projectUpdates,
  })
}
