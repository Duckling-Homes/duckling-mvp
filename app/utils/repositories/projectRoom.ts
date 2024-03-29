import { Prisma } from '@prisma/client'
import prisma from '../../../lib/prisma'

export async function createProjectRoom(
  roomData: Prisma.ProjectRoomUncheckedCreateInput
) {
  return await prisma.projectRoom.create({
    data: {
      id: roomData.id,
      name: roomData.name,
      type: roomData.type,
      floor: roomData.floor,
      comfortIssueTags: roomData.comfortIssueTags,
      safetyIssueTags: roomData.safetyIssueTags,
      notes: roomData.notes,
      project: {
        connect: {
          id: roomData.projectId,
        },
      },
    },
  })
}

export async function updateProjectRoom(
  id: string,
  roomUpdates: Prisma.ProjectRoomUpdateInput
) {
  return await prisma.projectRoom.update({
    where: { id },
    data: roomUpdates,
  })
}

export async function deleteProjectRoom(id: string) {
  return await prisma.projectRoom.delete({
    where: { id },
  })
}

export async function getProjectRooms(projectId: string) {
  return await prisma.projectRoom.findMany({
    where: { projectId },
    orderBy: [{ createdAt: 'asc' }],
  })
}

export async function getProjectRoom(id: string) {
  return await prisma.projectRoom.findUnique({
    where: { id },
  })
}

export async function validateProjectRoomPermission(
  organizationId: string,
  id: string
) {
  const projectRoom = await prisma.projectRoom.findUnique({
    where: { id },
    include: {
      project: true,
    },
  })
  if (!projectRoom || projectRoom.project.organizationId != organizationId) {
    throw new Error('ProjectRoom not found')
  }
}
