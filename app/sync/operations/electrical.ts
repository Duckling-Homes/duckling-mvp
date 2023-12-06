import { v4 as uuidv4 } from 'uuid'
import { db } from '../db'
import { ProjectElectrical } from '@/types/types'
import { SyncAPI } from '..'
import { syncAPImutation } from '.'

export class ElectricalSyncOperations {
  _typeToAPI = (type: string) => {
    const lowered = type.toLowerCase()

    switch (lowered) {
      case 'electricalpanel':
        return 'panel'
      case 'evcharger':
        return 'evCharger'
      default:
        return lowered
    }
  }

  create = syncAPImutation(async (projectID: string, electrical: ProjectElectrical) => {
    electrical.id = electrical.id ?? uuidv4()
    await db.enqueueRequest(
      `/api/electrical/${this._typeToAPI(electrical.type!)}`,
      {
        method: 'POST',
        body: JSON.stringify({
          ...electrical,
          projectId: projectID,
        }),
      }
    )

    await SyncAPI.projects._swap(projectID, (proj) => {
      proj.electrical = proj.electrical ?? []
      proj.electrical.push(electrical)
      return proj
    })
    return electrical
  })

  update = syncAPImutation(async (projectID: string, electrical: ProjectElectrical) => {
    await db.enqueueRequest(
      `/api/electrical/${this._typeToAPI(electrical.type!)}/${electrical.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          ...electrical,
          projectId: projectID,
        }),
      }
    )

    await SyncAPI.projects._swap(projectID, (proj) => {
      const idx = proj.electrical?.findIndex(
        (elec) => elec.id === electrical.id
      ) ?? -1
      if (idx > -1) {
        proj.electrical?.splice(idx, 1, electrical)
      }
      return proj
    })

    return electrical
  })

  delete = async (
    projectID: string,
    electricalType: string,
    electricalID: string
  ) => {
    await db.enqueueRequest(
      `/api/electrical/${this._typeToAPI(electricalType!)}/${electricalID}`,
      {
        method: 'DELETE',
      }
    )

    await SyncAPI.projects._swap(projectID, (proj) => {
      const idx = proj.electrical?.findIndex((elec) => elec.id === electricalID) ?? -1
      if (idx > -1) {
        proj.electrical?.splice(idx, 1)
      }
      return proj
    })
  }
}
