import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";

export async function createProject(project: Prisma.ProjectCreateInput) {
  const client = await prisma.project.create({
    data: project,
  });

  return client;
}

export async function getProjects() {
  const clients = await prisma.project.findMany();

  return clients;
}
