import { v4 as uuidv4 } from 'uuid'
import { SyncAPI } from '..'
import { PhotoDetails } from '@/types/types'
import { db } from '../db'

export class ImageSyncOperations {
  create = async (
    projectID: string,
    imgDataUrl: string,
    photoDetails: PhotoDetails
  ) => {
    photoDetails.id = photoDetails.id ?? uuidv4()
    await fetch(`/api/images`, {
      method: 'POST',
      body: JSON.stringify({
        ...photoDetails,
        projectId: projectID,
      }),
    }).then(async (_) => {
      await this.upload(photoDetails.id!, imgDataUrl)
    })

    const photo = {
      ...photoDetails,
      photoUrl: imgDataUrl,
    }

    await SyncAPI.projects._swap(projectID, (proj) => {
      if (photoDetails.isHeroPhoto) {
        proj.heroImageId = photoDetails.id
      }
      proj.images = proj.images ?? []
      proj.images.push(photo)
      return proj
    })
    return photo
  }

  upload = async (imageID: string, photoUrl: string) => {
    try {
      const response = await fetch(photoUrl)
      const arrayBuffer = await response.arrayBuffer()

      await fetch(`/api/images/${imageID}/upload`, {
        method: 'POST',
        body: arrayBuffer,
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      })
    } catch (error) {
      console.error('Error uploading the photo:', error)
    }

    return photoUrl
  }

  download = async (imageID: string) => {
    try {
      const response = await fetch(`/api/images/${imageID}/download`, {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error(`Failed to download image. Status: ${response.status}`)
      }

      const data = await response.arrayBuffer()
      const blob = new Blob([data], { type: 'image/png' })
      const objectURL = URL.createObjectURL(blob)
      return objectURL
    } catch (error) {
      console.error('Error uploading the photo:', error)
    }
  }

  update = async (projectID: string, photoDetails: PhotoDetails) => {
    await db.enqueueRequest(`/api/images/${photoDetails.id}`, {
      method: 'PATCH',
      body: JSON.stringify(photoDetails),
    })
    await SyncAPI.projects._swap(projectID, (proj) => {
      const newHeroImageId = photoDetails.isHeroPhoto
        ? photoDetails.id
        : proj.heroImageId

      const idx = proj.images?.findIndex(
        (image) => image.id === photoDetails.id
      )
      const newImages = proj.images ? [...proj.images] : []
      if (idx !== undefined && idx !== -1) {
        newImages.splice(idx, 1)
      }
      newImages.push(photoDetails)

      return {
        ...proj,
        heroImageId: newHeroImageId,
        images: newImages,
      }
    })

    return photoDetails
  }

  delete = async (projectID: string, imageID: string) => {
    await db.enqueueRequest(
      `/api/images/${imageID}`,
      {method: 'DELETE'}
    )

    await SyncAPI.projects._swap(projectID, (proj) => {
      const idx = proj.images?.findIndex((image) => image.id === imageID)
      if(imageID == proj.heroImageId) {
        proj.heroImageId = undefined
      }

      if(idx != undefined) {
        proj.images?.splice(idx, 1)
      }
      return proj
    })
  }
}
