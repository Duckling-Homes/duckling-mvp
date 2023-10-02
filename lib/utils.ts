import { getAuth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { NextRequest } from "next/server";
import prisma from "./prisma";

export const ensureUserExists = async (req: NextRequest): Promise<User> => {
  const { userId } = getAuth(req);

  if (!userId) throw new Error("No user ID found in request");

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
