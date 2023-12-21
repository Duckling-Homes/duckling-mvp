import { syncAPImutation } from '.'
import { synchronizedFetch } from '../utils'

export class PresentationSyncOperations {
  get = syncAPImutation(async (projectID: string) => {
    // This probably also needs to work on offline... so should build this object from all the other details
    const response = await synchronizedFetch(`/api/presentation/${projectID}`, {
      method: 'GET',
    })

    const presentation = await response.json()
    return presentation
  })
}
