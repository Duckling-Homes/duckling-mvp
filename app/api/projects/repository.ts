import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";

export async function createProject(project: Prisma.ProjectCreateInput) {
  const createdProject = await prisma.project.create({
    data: project,
  });

  return createdProject;
}

export async function getProjects(filter: { organizationId?: string }) {
  const projects = await prisma.project.findMany({
    where: filter
  });

  return projects;
}

export async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
  });

  return project;
}

export async function deleteProject(id: string) {
  return await prisma.project.delete({
    where: { id },
  });
}

export async function updateProject(
  id: string,
  projectUpdates: Prisma.ProjectUpdateInput,
) {
  const updatedProject = await prisma.project.update({
    where: { id },
    data: projectUpdates,
  });

  return updatedProject;
}
