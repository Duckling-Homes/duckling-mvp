import { v4 as uuidv4 } from 'uuid'
import { SyncAPI } from '..'

export class ImageSyncOperations {
  create = async (projectID: string, imgDataUrl: string) => {
    const imageId = uuidv4()
    await fetch(`/api/images`, {
      method: 'POST',
      body: JSON.stringify({
        id: imageId,
        projectId: projectID,
      }),
    }).then(async (_) => {
      await this.upload(imageId, imgDataUrl)
    })
    // await db.enqueueRequest(`/api/images`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     id: imageId,
    //     projectId: projectID,
    //   }),
    // })

    await this.upload(imageId, imgDataUrl)
    const photo = {
      id: imageId,
      photoUrl: imgDataUrl,
    }

    await SyncAPI.projects._swap(projectID, (proj) => {
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
}
