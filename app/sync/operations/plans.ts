import { v4 as uuidv4 } from 'uuid'
import { db } from '../db'
import { SyncAPI } from '..'
import { Plan } from '@/types/types'

export class PlansSyncOperations {

  create = async (projectID: string, plan: Plan) => {
    plan.id = plan.id ?? uuidv4()

    await db.enqueueRequest(
      `/api/plans`,
      {
        method: 'POST',
        body: JSON.stringify({
          projectId: projectID,
          ...plan
        }),
      }
    )

    await SyncAPI.projects._swap(projectID, (proj) => {
      proj.plans = proj.plans ?? []
      proj.plans.push(plan)
      return proj
    })
    
    SyncAPI.pushChanges()

    return plan
  }

  delete = async (projectID: string, planID: string) => {
    await db.enqueueRequest(
      `/api/plans/${planID}`,
      {
        method: 'DELETE'
      }
    )

    await SyncAPI.projects._swap(projectID, (proj) => {
      const idx = proj.plans?.findIndex((plan) => plan.id === planID) ?? -1
      if (idx > -1) {
        proj.plans?.splice(idx, 1)
      }
      return proj
    })

    SyncAPI.pushChanges()
  }
}
