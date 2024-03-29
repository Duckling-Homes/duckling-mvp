import { isOnline } from './utils'
import { ProjectSyncOperations } from './operations/project'
import { OrganizationSyncOperations } from './operations/organization'
import { ApplianceSyncOperations } from './operations/appliances'
import { EnvelopeComponentSyncOperations } from './operations/envelope'
import { ElectricalSyncOperations } from './operations/electrical'
import { RoomSyncOperations } from './operations/room'
import { ImageSyncOperations } from './operations/images'
import { PlansSyncOperations } from './operations/plans'
import { _Request, db } from './db'
import { SyncAPIEvents } from './events'
import { PresentationSyncOperations } from './operations/presentation'
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
 * - If there are outbound requests, only data written by "client" will be served back (this will get replaced by an "api" view once requests are flushed)
 *
 */
class _SyncAPI {
  events = SyncAPIEvents
  bgSyncInterval: NodeJS.Timeout | null = null
  loopingInterval: NodeJS.Timeout | null = null

  // Define Sub-APIs
  organizations = new OrganizationSyncOperations()
  projects = new ProjectSyncOperations()
  appliances = new ApplianceSyncOperations()
  electrical = new ElectricalSyncOperations()
  envelopeComponents = new EnvelopeComponentSyncOperations()
  rooms = new RoomSyncOperations()
  images = new ImageSyncOperations()
  plans = new PlansSyncOperations()
  presentation = new PresentationSyncOperations()

  // Metadata
  lastOnlineStatus: 'online' | 'offline' = 'online'

  init() {
    clearInterval(this.loopingInterval!)
    this.loopingInterval = setInterval(this._loop, 200)

    // This hook inspects all requests and force pulls updates the API once the request queue is empty
    // NOTE: Still not 100% fool proof, fix only if buggy
    this.events.on('did-push-requests', (requests: _Request[]) => {
      requests.map(async (request) => {
        // NOTE: This is kind of brute force.
        const body = (request.options?.body ?? {}) as {
          projectId?: string
          id?: string
        }
        const projectID = body?.projectId ?? body?.id
        if (projectID) {
          // NOTE: We only want to update IndexeDB with API view if request queue is empty!
          this.projects._pullProjectFromAPI(projectID)
        }
      })
    })

    this.events.on('did-go-online', (_) => {
      this.pushChanges()
    })
  }

  sync = async () => {
    if (!this.loopingInterval) this.init()

    if (!isOnline()) {
      console.warn('Ignore sync, is offline...')
    } else {
      await this.pushChanges();
    }
    
    return await this.pullLatest();
  }

  pushChanges = async () => {
    return await db.publishChanges()
  }

  pullLatest = async () => {
    const projects = await this.projects.list();
    projects.forEach((p) => {
      this.projects.get(p.id!);
    })
    return projects;
  }

  setBackgroundSync = (enabled: boolean, intervalMS: number = 5000) => {
    clearInterval(this.bgSyncInterval!)
    if (enabled) {
      this.bgSyncInterval = setInterval(this.sync, intervalMS)
    }
  }

  _loop = () => {
    this._loopTaskCheckPending()
    this._loopTaskCheckOnline()
  }

  _loopTaskCheckPending = async () => {
    const status = await db.hasPendingChanges()
    this.events.emit('has-pending-changes', status)
  }

  _loopTaskCheckOnline = async () => {
    const currentStatus = isOnline() ? 'online' : 'offline'
    if (currentStatus !== this.lastOnlineStatus) {
      this.events.emit(`did-go-${currentStatus}`, Date.now())
    }
    this.lastOnlineStatus = currentStatus
  }
}

export const SyncAPI = new _SyncAPI()
