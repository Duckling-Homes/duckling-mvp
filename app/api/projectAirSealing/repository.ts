import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";

// Need to determine what fields are required and which are optional
// TODO: Add checking with org-context to ensure access to this data is allowed
export async function createProjectAirSealing(project: Prisma.ProjectAirSealingCreateInput) {
  return await prisma.projectAirSealing.create({
    data: project,
  });
}

export async function getProjectAirSealingsForEnvelope(envelopeId: string) {
  return await prisma.projectAirSealing.findMany({
    where: { envelopeId }
  });
}

export async function getProjectAirSealingsForProject(projectId: string) {
    return await prisma.projectAirSealing.findMany({
      where: { projectId }
    });
  }

export async function getProjectAirSealing(id: string) {
  return await prisma.projectAirSealing.findUnique({
    where: { id },
  });
}

export async function deleteProjectAirSealing(id: string) {
  return await prisma.projectAirSealing.delete({
    where: { id },
  });
}

export async function updateProjectAirSealing(
  id: string,
  projectAirSealingUpdates: Prisma.ProjectAirSealingUpdateInput,
) {
  return await prisma.projectAirSealing.update({
    where: { id },
    data: projectAirSealingUpdates,
  });
}
