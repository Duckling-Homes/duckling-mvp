import { syncAPImutation } from '.'
import { synchronizedFetch } from '../utils'

export class PresentationSyncOperations {
  get = syncAPImutation(async (orgID: string, projectID: string) => {
    const response = await synchronizedFetch(
      `/api/presentation/${orgID}/projects/${projectID}`,
      {
        method: 'GET',
      }
    )

    const presentation = await response.json()
    return presentation
  })

  downloadImage = async (orgID: string, projectID: string, imageID: string) => {
    try {
      const response = await fetch(
        `/api/presentation/${orgID}/projects/${projectID}/images/${imageID}`,
        {
          method: 'GET',
        }
      )

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
