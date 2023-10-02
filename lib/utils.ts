import { User } from "@prisma/client";
import prisma from "./prisma";

export const checkIfUserExistsAndCreateIfNot = async (
  userId: string
): Promise<User> => {
  var user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    user = await prisma.user.create({ data: { id: userId } });
  }

  return user;
};

export const doesUserExist = async (userId: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return !!user;
};
