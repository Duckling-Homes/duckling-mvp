import { Prisma } from '@prisma/client'
import prisma from '../../../lib/prisma'
import HandlerError from '../HandlerError'

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

  if (image?.project.organizationId === organizationId) {
    return true
  } else {
    throw new HandlerError('Image Not Found', 404)
  }
}

export async function isImageInProject(
  imageId: string,
  projectId: string
): Promise<boolean> {
  const image = await prisma.image.findUnique({
    where: { id: imageId },
    include: { project: true },
  })

  if (image?.project.id === projectId) {
    return true
  } else {
    throw new HandlerError('Image Not Found', 404)
  }
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
        duplicatedFrom: imageData.duplicatedFromId
          ? {
              connect: {
                id: imageData.duplicatedFromId,
              },
            }
          : undefined, // If duplicatedFromId is not provided, it will remain undefined
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
export async function deleteImage(id: string) {
  return await prisma.image.delete({
    where: { id },
  })
}

type ExtendedImageUpdateInput = Prisma.ImageUpdateInput & {
  isHeroPhoto?: boolean
}

// Update an image by its ID
export async function updateImage(
  id: string,
  imageUpdates: ExtendedImageUpdateInput
) {
  const image = await prisma.image.findUnique({
    where: { id },
    include: { project: true },
  })

  if (!image) {
    return null
  }

  // If imageUpdates.isHeroPhoto is true, update the project's heroImageId
  if (imageUpdates.isHeroPhoto) {
    await prisma.project.update({
      where: { id: image.project.id },
      data: {
        heroImageId: id,
      },
    })
  }
  // If imageUpdates.isHeroPhoto is false, and this image is currently the hero image, clear the project's heroImageId
  else if (
    imageUpdates.isHeroPhoto === false &&
    image.project.heroImageId === id
  ) {
    await prisma.project.update({
      where: { id: image.project.id },
      data: {
        heroImageId: null,
      },
    })
  }

  // Remove isHeroImage from input
  delete imageUpdates.isHeroPhoto

  return await prisma.image.update({
    where: { id },
    data: imageUpdates,
  })
}
