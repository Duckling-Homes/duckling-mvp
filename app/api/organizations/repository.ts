import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";

export async function createOrganization(organization: Prisma.OrganizationCreateInput) {
  return await prisma.organization.create({
    data: organization,
  });
}

export async function getOrganizations() {
  return await prisma.organization.findMany();
}

export async function getOrganization(id: string) {
  return await prisma.organization.findUnique({
    where: { id },
  });
}

export async function deleteOrganization(id: string) {
  return await prisma.organization.delete({
    where: { id },
  });
}

export async function updateOrganization(
  id: string,
  organizationUpdates: Prisma.OrganizationUpdateInput,
) {
  return await prisma.organization.update({
    where: { id },
    data: organizationUpdates,
  });
}
