import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";

// Need to determine what fields are required and which are optional
// TODO: Add checking with org-context to ensure access to this data is allowed
export async function createProjectEnvelope(projectEnvelope: Prisma.ProjectEnvelopeCreateInput) {
  return await prisma.projectEnvelope.create({
    data: projectEnvelope,
  });
}

export async function getProjectEnvelopes(projectId: string) {
  return await prisma.projectEnvelope.findMany({
    where: { projectId }
  });
}

export async function getProjectEnvelope(id: string) {
  return await prisma.projectEnvelope.findUnique({
    where: { id },
  });
}

export async function deleteProjectEnvelope(id: string) {
  return await prisma.projectEnvelope.delete({
    where: { id },
  });
}

export async function updateProjectEnvelope(
  id: string,
  projectEnvelopeUpdates: Prisma.ProjectEnvelopeUpdateInput,
) {
  return await prisma.projectEnvelope.update({
    where: { id },
    data: projectEnvelopeUpdates,
  });
}
