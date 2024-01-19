import { Plan } from '@/types/types'
import { v4 as uuidv4 } from 'uuid'
import { syncAPImutation } from '.'
import { SyncAPI } from '..'
import { db } from '../db'

export class PlansSyncOperations {
  create = syncAPImutation(async (projectID: string, plan: Plan) => {
    plan.id = plan.id ?? uuidv4()

    await db.enqueueRequest(`/api/plans`, {
      method: 'POST',
      body: JSON.stringify({
        projectId: projectID,
        ...plan,
      }),
    })

    await SyncAPI.projects._swap(projectID, (proj) => {
      proj.plans = proj.plans ?? []
      proj.plans.push(plan)
      return proj
    })

    SyncAPI.pushChanges()

    return plan
  })

  delete = syncAPImutation(async (projectID: string, planID: string) => {
    await db.enqueueRequest(`/api/plans/${planID}`, {
      method: 'DELETE',
    })

    await SyncAPI.projects._swap(projectID, (proj) => {
      const idx = proj.plans?.findIndex((plan) => plan.id === planID) ?? -1
      if (idx > -1) {
        proj.plans?.splice(idx, 1)
      }
      return proj
    })

    SyncAPI.pushChanges()
  })

  update = syncAPImutation(async (projectID: string, plan: Plan) => {
    await db.enqueueRequest(`/api/plans/${plan.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...plan,
        projectId: projectID,
      }),
    })

    await SyncAPI.projects._swap(projectID, (proj) => {
      const idx = proj.plans?.findIndex((pl) => pl.id === plan.id) ?? -1
      if (idx > -1) {
        proj.plans?.splice(idx, 1, plan)
      }
      return proj
    })

    SyncAPI.pushChanges()

    return plan
  })

  generateCopy = async (plan: Plan) => {
    try {
      const response = await fetch(`/api/plans/${plan.id}/generate-copy`, {
        method: 'GET',
      })

      plan.copy = await response.json()

      if (plan.projectId) {
        await this.update(plan.projectId, plan)
      }
    } catch (err) {
      console.warn('Copy generation failed', { plan, err })
    }
  }
}
