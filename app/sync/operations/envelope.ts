import { v4 as uuidv4 } from 'uuid'
import { db } from '../db'
import { ProjectEnvelopeComponent } from '@/types/types'
import { SyncAPI } from '..'
import { syncAPImutation } from '.'

export class EnvelopeComponentSyncOperations {
  create = syncAPImutation(
    async (projectID: string, envelopeComponent: ProjectEnvelopeComponent) => {
      envelopeComponent.id = envelopeComponent.id ?? uuidv4()
      await db.enqueueRequest(
        `/api/projects/${projectID}/envelopes/components`,
        {
          method: 'POST',
          body: JSON.stringify({
            ...envelopeComponent,
            projectId: projectID,
          }),
        }
      )

      await SyncAPI.projects._swap(projectID, (proj) => {
        proj.envelopeComponents = proj.envelopeComponents ?? []
        proj.envelopeComponents.push(envelopeComponent)
        return proj
      })
      return envelopeComponent
    }
  )

  update = syncAPImutation(
    async (projectID: string, envelopeComponent: ProjectEnvelopeComponent) => {
      await db.enqueueRequest(
        `/api/projects/${projectID}/envelopes/components/${envelopeComponent.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            ...envelopeComponent,
            projectId: projectID,
          }),
        }
      )

      await SyncAPI.projects._swap(projectID, (proj) => {
        const idx =
          proj.envelopeComponents?.findIndex(
            (env) => env.id === envelopeComponent.id
          ) ?? -1
        if (idx > -1) {
          proj.envelopeComponents?.splice(idx, 1, envelopeComponent)
        }
        return proj
      })

      return envelopeComponent
    }
  )

  delete = syncAPImutation(
    async (projectID: string, envelopeComponentID: string) => {
      await db.enqueueRequest(
        `/api/projects/${projectID}/envelopes/components/${envelopeComponentID}`,
        {
          method: 'DELETE',
        }
      )
      await SyncAPI.projects._swap(projectID, (proj) => {
        const idx =
          proj.envelopeComponents?.findIndex(
            (env) => env.id === envelopeComponentID
          ) ?? -1
        if (idx > -1) {
          proj.envelopeComponents?.splice(idx, 1)
        }
        return proj
      })
    }
  )
}
