import { syncAPImutation } from '.'
import { synchronizedFetch } from '../utils'

export class PresentationSyncOperations {
  get = syncAPImutation(async (projectID: string) => {
    const response = await synchronizedFetch(`/api/presentation/${projectID}`, {
      method: 'GET',
    })

    const presentation = await response.json()
    return presentation
  })
}
