import { Prisma } from '@prisma/client';
import prisma from '../../../lib/prisma';

// Create a new image entry
export async function createImage(imageData: Prisma.ImageCreateInput) {
  return await prisma.image.create({
    data: imageData,
  });
}

// Get all images for a particular project
export async function getImagesByProjectId(projectId: string) {
  return await prisma.image.findMany({
    where: { projectId },
  });
}

// Get a single image by its ID
export async function getImageById(id: string) {
  return await prisma.image.findUnique({
    where: { id },
  });
}

// Delete an image by its ID
export async function deleteImage(id: string) {
  return await prisma.image.delete({
    where: { id },
  });
}

// Update an image by its ID
export async function updateImage(
  id: string,
  imageUpdates: Prisma.ImageUpdateInput
) {
  return await prisma.image.update({
    where: { id },
    data: imageUpdates,
  });
}
