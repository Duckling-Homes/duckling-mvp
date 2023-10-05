import { Prisma } from '@prisma/client'
import prisma from '../../../lib/prisma'

export async function createUser(userData: Prisma.UserUncheckedCreateInput) {
  return await prisma.user.create({
    data: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      organization: {
        connect: {
          id: userData.organizationId,
        },
      },
    },
  })
}

export async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  })
}

export async function updateUser(
  id: string,
  userUpdates: Prisma.UserUpdateInput
) {
  return await prisma.user.update({
    where: { id },
    data: userUpdates,
  })
}
