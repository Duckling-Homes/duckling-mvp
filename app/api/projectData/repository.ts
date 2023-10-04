import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";

// Need to determine what fields are required and which are optional
// TODO: Add checking with org-context to ensure access to this data is allowed
export async function createProjectData(project: Prisma.ProjectDataCreateInput) {
  return await prisma.projectData.create({
    data: project,
  });
}

export async function getAllProjectData(projectId: string) {
  return await prisma.projectData.findMany({
    where: { projectId }
  });
}

export async function getProjectDataById(id: string) {
  return await prisma.projectData.findUnique({
    where: { id },
  });
}

export async function deleteProjectData(id: string) {
  return await prisma.projectData.delete({
    where: { id },
  });
}

export async function updateProjectData(
  id: string,
  projectDataUpdates: Prisma.ProjectDataUpdateInput,
) {
  return await prisma.projectData.update({
    where: { id },
    data: projectDataUpdates,
  });
}
