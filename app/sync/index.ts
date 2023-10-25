import { isOnline, publishChanges } from './utils'
import { ProjectSyncOperations } from './operations/project'
import { OrganizationSyncOperations } from './operations/organization'
import { ApplianceSyncOperations } from './operations/appliances'
import { EnvelopeSyncOperations } from './operations/envelope'
import { ElectricalSyncOperations } from './operations/electrical'
import { RoomSyncOperations } from './operations/room'
import { PhotoSyncOperations } from './operations/photos'
/**
 * This class is the main access point to the "Sync Layer"
 * which serves to synchronize the changes between local db & remote.
 *
 * --- HOW IT WORKS ---
 * It uses an IndexDB (the objects table) as the source of truth for this app
 * and keeps that source of truth in sync with the API whenever internet is available.
 * When offline, it queues outbound requests in another IndexDB (the requests table) which
 * are executed whenever `.sync` comes online.
 *
 * --- INTERACTING WITH OPERATIONS ---
 * Object-specific reads/writes are organized by sub-API. For example, to update/read/create projects,
 * you will use SyncAPI.projects.{operation}. These APIs read/write to IndexedDB and promise
 * they eventually will sync with API.
 *
 * --- ON SYNCING ---
 * `.sync` expells pending changes and pulls in the latest from the API when online.
 * Set `.setBackgroundSync` allows for configuring `.sync` to be fired on an interval.
 * Configure any global data or necessary data for offline that needs to be refreshed
 * in `.pullLatest`
 *
 * Guiding principles:
 * - All reads and writes must use the objects db as the source of truth.
 * - Only reads can happen directly against the API and should happen after publishing changes.
 * - All writes must be queued against the outbound requests db.
 * - For reading data, flush the outbound requests before pulling in new data.
 *
 */
class _SyncAPI {
  bgSyncInterval: NodeJS.Timeout | null = null
  onNewChanges: () => void = () => {}

  // Define Sub-APIs
  organizations = new OrganizationSyncOperations()
  projects = new ProjectSyncOperations()
  appliances = new ApplianceSyncOperations()
  electrical = new ElectricalSyncOperations()
  envelopes = new EnvelopeSyncOperations()
  rooms = new RoomSyncOperations()
  photos = new PhotoSyncOperations()

  sync = async () => {
    if (!isOnline()) {
      console.warn('Ignore sync, is offline...')
      return
    }
    await this.pushChanges()
    await this.pullLatest()
  }

  pushChanges = async () => {
    const didChange = await publishChanges()
    if (didChange) {
      this.onNewChanges()
    }
  }

  pullLatest = async () => {
    const projects = await this.projects.list()
    projects.forEach((p) => {
      this.projects.get(p.id!)
    })
  }

  setBackgroundSync = (enabled: boolean, intervalMS: number = 15000) => {
    clearInterval(this.bgSyncInterval!)
    if (enabled) {
      this.bgSyncInterval = setInterval(this.sync, intervalMS)
    }
  }
}

export const SyncAPI = new _SyncAPI()
