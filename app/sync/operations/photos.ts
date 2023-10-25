import { v4 as uuidv4 } from 'uuid'
import { db } from '../db'
import { PhotoDetails } from '@/types/types'

export class PhotoSyncOperations {
  create = async (projectID: string, photo: PhotoDetails) => {
    photo.id = photo.id ?? uuidv4()

    try {
      await fetch(`/api/images/`, {
        method: 'POST',
        body: JSON.stringify({
          ...photo,
          projectId: projectID,
        }),
      })
    } catch (error) {
      console.error('Error uploading the photo:', error)
    }
    return photo
  }

  upload = async (imageID: string, photoUrl: string) => {
    const response = await fetch(photoUrl)
    const blob = await response.blob()

    const formData = new FormData()
    formData.append('file', blob)

    try {
      await fetch(`/api/images/${imageID}/upload`, {
        method: 'POST',
        body: formData,
      })
    } catch (error) {
      console.error('Error uploading the photo:', error)
    }

    return photoUrl
  }
}
