import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";

// Need to determine what fields are required and which are optional
// TODO: Add checking with org-context to ensure access to this data is allowed
export async function createProjectInsulation(project: Prisma.ProjectInsulationCreateInput) {
  return await prisma.projectInsulation.create({
    data: project,
  });
}

export async function getProjectInsulationsForEnvelope(envelopeId: string) {
  return await prisma.projectInsulation.findMany({
    where: { envelopeId }
  });
}

export async function getProjectInsulationsForProject(projectId: string) {
    return await prisma.projectInsulation.findMany({
      where: { projectId }
    });
  }

export async function getProjectInsulation(id: string) {
  return await prisma.projectInsulation.findUnique({
    where: { id },
  });
}

export async function deleteProjectInsulation(id: string) {
  return await prisma.projectInsulation.delete({
    where: { id },
  });
}

export async function updateProjectInsulation(
  id: string,
  projectInsulationUpdates: Prisma.ProjectInsulationUpdateInput,
) {
  return await prisma.projectInsulation.update({
    where: { id },
    data: projectInsulationUpdates,
  });
}
