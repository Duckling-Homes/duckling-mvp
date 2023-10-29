import { v4 as uuidv4 } from 'uuid'
import { db } from '../db'
import { ProjectRoom } from '@/types/types'
import { SyncAPI } from '..'

export class RoomSyncOperations {
  create = async (projectID: string, room: ProjectRoom) => {
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

    return room
  }

  update = async (projectID: string, room: ProjectRoom) => {
    await db.enqueueRequest(`/api/projectRooms/${room.id}`, {
      method: 'PATCH',
      body: JSON.stringify(room),
    })
    await SyncAPI.projects._swap(projectID, (proj) => {
      const idx = proj.rooms?.findIndex((r) => r.id === room.id)
      if (idx) {
        proj.rooms?.splice(idx, 1)
      }
      proj.rooms?.push(room)
      return proj
    })
    return room
  }

  delete = async (projectID: string, roomID: string) => {
    await db.enqueueRequest(`/api/projectRooms/${roomID}`, {
      method: 'DELETE',
    })

    await SyncAPI.projects._swap(projectID, (proj) => {
      const idx = proj.rooms?.findIndex((r) => r.id === roomID)
      if (idx) {
        proj.rooms?.splice(idx, 1)
      }
      return proj
    })
  }
}
