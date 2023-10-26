import { Prisma } from '@prisma/client'
import prisma from '../../../lib/prisma'

type ExtendedImageCreateInput = Prisma.ImageUncheckedCreateInput & {
  isHeroPhoto?: boolean
}

/**
 * Verifies if an image is part of a project that belongs to the specified organization.
 *
 * @param imageId - The ID of the image.
 * @param organizationId - The ID of the organization.
 * @returns True if the image's project is in the organization, otherwise false.
 */
export async function isImageInOrganization(
  imageId: string,
  organizationId: string
): Promise<boolean> {
  const image = await prisma.image.findUnique({
    where: { id: imageId },
    include: { project: true },
  })

  return image?.project.organizationId === organizationId || false
}

export async function createImage(
  imageData: ExtendedImageCreateInput,
  organizationContext: string
) {
  // Fetch the project details based on the projectId
  const project = await prisma.project.findUnique({
    where: { id: imageData.projectId },
  })

  // Check if the project's organizationId matches the organizationContext
  if (project && project.organizationId === organizationContext) {
    // Create the image
    const createdImage = await prisma.image.create({
      data: {
        id: imageData.id,
        name: imageData.name,
        homeownerNotes: imageData.homeownerNotes,
        internalNotes: imageData.internalNotes,
        roomId: imageData.roomId,
        envelopeId: imageData.envelopeId,
        applianceId: imageData.applianceId,
        electricalId: imageData.electricalId,
        project: {
          connect: {
            id: imageData.projectId,
          },
        },
      },
    })

    // If imageData.isHeroImage is true, upsert the project's heroImageId
    if (imageData.isHeroPhoto) {
      await prisma.project.update({
        where: { id: imageData.projectId },
        data: {
          heroImageId: createdImage.id,
        },
      })
    }

    return createdImage
  } else {
    throw new Error('Organization context does not match')
  }
}

// Get all images for a particular project
export async function getImagesByProjectId(
  projectId: string,
  organizationContext: string
) {
  return await prisma.image.findMany({
    where: {
      projectId,
      project: {
        organizationId: organizationContext,
      },
    },
  })
}

// Get a single image by its ID
export async function getImageById(id: string, organizationContext: string) {
  return await prisma.image
    .findUnique({
      where: { id },
      include: { project: true },
    })
    .then((image) => {
      if (image?.project.organizationId === organizationContext) {
        return image
      }
      return null
    })
}

// Delete an image by its ID
export async function deleteImage(id: string, organizationContext: string) {
  const image = await prisma.image.findUnique({
    where: { id },
    include: { project: true },
  })

  if (image?.project.organizationId !== organizationContext) {
    return null
  }

  return await prisma.image.delete({
    where: { id },
  })
}

// Update an image by its ID
export async function updateImage(
  id: string,
  imageUpdates: Prisma.ImageUpdateInput,
  organizationContext: string
) {
  const image = await prisma.image.findUnique({
    where: { id },
    include: { project: true },
  })

  if (image?.project.organizationId !== organizationContext) {
    return null
  }

  return await prisma.image.update({
    where: { id },
    data: imageUpdates,
  })
}
