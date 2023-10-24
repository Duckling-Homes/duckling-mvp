import { Prisma } from '@prisma/client';
import prisma from '../../../lib/prisma';

interface CreateImageInput extends Prisma.ImageCreateInput {
  organizationContext: string;
}

// Create a new image entry
export async function createImage(imageData: CreateImageInput) {
  return await prisma.image.create({
    data: {
      ...imageData,
      project: {
        connect: {
          id: imageData.projectId,
          organizationId: imageData.organizationContext,
        },
      },
    },
  });
}

// Get all images for a particular project
export async function getImagesByProjectId(projectId: string, organizationContext: string) {
  return await prisma.image.findMany({
    where: {
      projectId,
      project: {
        organizationId: organizationContext,
      },
    },
  });
}

// Get a single image by its ID
export async function getImageById(id: string, organizationContext: string) {
  return await prisma.image.findUnique({
    where: { id },
    include: {
      project: {
        where: {
          organizationId: organizationContext,
        },
      },
    },
  });
}

// Delete an image by its ID
export async function deleteImage(id: string, organizationContext: string) {
  return await prisma.image.delete({
    where: { id },
    include: {
      project: {
        where: {
          organizationId: organizationContext,
        },
      },
    },
  });
}

// Update an image by its ID
export async function updateImage(
  id: string,
  imageUpdates: Prisma.ImageUpdateInput,
  organizationContext: string
) {
  return await prisma.image.update({
    where: { id },
    data: imageUpdates,
    include: {
      project: {
        where: {
          organizationId: organizationContext,
        },
      },
    },
  });
}
