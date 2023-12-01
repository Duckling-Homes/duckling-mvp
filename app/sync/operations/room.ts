import { v4 as uuidv4 } from 'uuid'
import { db } from '../db'
import { ProjectRoom } from '@/types/types'
import { SyncAPI } from '..'
import { syncAPImutation } from '.'

export class RoomSyncOperations {
  create = syncAPImutation(async (projectID: string, room: ProjectRoom) => {
    room.id = room.id ?? uuidv4()
    await db.enqueueRequest('/api/projectRooms', {
      method: 'POST',
      body: JSON.stringify(room),
    })

    await SyncAPI.projects._swap(projectID, (proj) => {
      proj.rooms = proj.rooms ?? []
      proj.rooms.push(room)
      return proj
    })

    SyncAPI.pushChanges();
    return room
  })

  update = syncAPImutation(async (projectID: string, room: ProjectRoom) => {
    await db.enqueueRequest(`/api/projectRooms/${room.id}`, {
      method: 'PATCH',
      body: JSON.stringify(room),
    })
    await SyncAPI.projects._swap(projectID, (proj) => {
      const idx = proj.rooms?.findIndex((r) => r.id === room.id) ?? -1;
      if (idx > -1) {
        proj.rooms?.splice(idx, 1, room)
      }
      return proj
    })

    SyncAPI.pushChanges();
    return room
  })

  delete = syncAPImutation(async (projectID: string, roomID: string) => {
    await db.enqueueRequest(`/api/projectRooms/${roomID}`, {
      method: 'DELETE',
    })

    await SyncAPI.projects._swap(projectID, (proj) => {
      const idx = proj.rooms?.findIndex((r) => r.id === roomID) ?? -1;
      if (idx > -1) {
        proj.rooms?.splice(idx, 1)
      }
      return proj
    })

    SyncAPI.pushChanges();
  })
}
