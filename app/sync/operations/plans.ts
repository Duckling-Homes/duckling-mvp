import { v4 as uuidv4 } from 'uuid'
import { db } from '../db'
import { SyncAPI } from '..'

export class PlansSyncOperations {

  create = async (projectID: string, name: string) => {

    const a = await db.enqueueRequest(
      `/api/plans`,
      {
        method: 'POST',
        body: JSON.stringify({
          projectId: projectID,
          name: name
        }),
      }
    )
    
    SyncAPI.pushChanges()

    return a
  }
}
