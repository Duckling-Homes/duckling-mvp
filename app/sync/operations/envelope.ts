import { v4 as uuidv4 } from 'uuid'
import { db } from '../db'
import { ProjectEnvelope } from '@/types/types'
import { SyncAPI } from '..'

export class EnvelopeSyncOperations {
  create = async (projectID: string, envelope: ProjectEnvelope) => {
    envelope.id = envelope.id ?? uuidv4()
    await db.enqueueRequest(`/api/project${envelope.type}`, {
      method: 'POST',
      body: JSON.stringify({
        ...envelope,
        projectId: projectID,
      }),
    })

    await SyncAPI.projects._swap(projectID, (proj) => {
      proj.envelopes = proj.envelopes ?? []
      proj.envelopes.push(envelope)
      return proj
    })
    return envelope
  }

  update = async (projectID: string, envelope: ProjectEnvelope) => {
    await db.enqueueRequest(`/api/project${envelope.type}/${envelope.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...envelope,
        projectId: projectID,
      }),
    })

    await SyncAPI.projects._swap(projectID, (proj) => {
      const idx = proj.envelopes?.findIndex((env) => env.id === envelope.id)
      if (idx) {
        proj.envelopes?.splice(idx, 1)
      }
      proj.envelopes?.push(envelope)
      return proj
    })

    return envelope
  }

  delete = async (
    projectID: string,
    envelopeType: string,
    envelopeID: string
  ) => {
    await db.enqueueRequest(`/api/project${envelopeType}/${envelopeID}`, {
      method: 'DELETE',
    })
    await SyncAPI.projects._swap(projectID, (proj) => {
      const idx = proj.envelopes?.findIndex((env) => env.id === envelopeID)
      if (idx) {
        proj.envelopes?.splice(idx, 1)
      }
      return proj
    })
  }
}
