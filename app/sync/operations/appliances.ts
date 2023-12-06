import { v4 as uuidv4 } from 'uuid'
import { db } from '../db'
import { ProjectAppliance } from '@/types/types'
import { SyncAPI } from '..'
import { syncAPImutation } from '.'

export class ApplianceSyncOperations {
  create = syncAPImutation(async (
    projectID: string,
    applianceType: string,
    appliance: ProjectAppliance
  ) => {
    appliance.id = appliance.id ?? uuidv4()
    await db.enqueueRequest(`/api/appliances/${applianceType}`, {
      method: 'POST',
      body: JSON.stringify({
        ...appliance,
        projectId: projectID,
      }),
    })

    await SyncAPI.projects._swap(projectID, (proj) => {
      proj.appliances = proj.appliances ?? []
      proj.appliances.push(appliance)
      return proj
    })
    return appliance
  })

  update = syncAPImutation(async (
    projectID: string,
    applianceType: string,
    appliance: ProjectAppliance
  ) => {
    await db.enqueueRequest(
      `/api/appliances/${applianceType}/${appliance.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          ...appliance,
          projectId: projectID,
        }),
      }
    )

    await SyncAPI.projects._swap(projectID, (proj) => {
      const idx = proj.appliances?.findIndex((app) => app.id === appliance.id) ?? -1
      if (idx > -1) {
        proj.appliances?.splice(idx, 1, appliance)
      }
      return proj
    })

    return appliance
  })

  delete = syncAPImutation(async (
    projectID: string,
    applianceType: string,
    applianceId: string
  ) => {
    await db.enqueueRequest(`/api/appliances/${applianceType}/${applianceId}`, {
      method: 'DELETE',
    })

    await SyncAPI.projects._swap(projectID, (proj) => {
      const idx = proj.appliances?.findIndex((app) => app.id === applianceId) ?? -1
      if (idx > -1) {
        proj.appliances?.splice(idx, 1)
      }
      return proj
    })
  })
}
