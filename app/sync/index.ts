import { isOnline } from './utils'
import { ProjectSyncOperations } from './operations/project'
import { OrganizationSyncOperations } from './operations/organization'
import { ApplianceSyncOperations } from './operations/appliances'
import { EnvelopeSyncOperations } from './operations/envelope'
import { ElectricalSyncOperations } from './operations/electrical'
import { RoomSyncOperations } from './operations/room'
import { ImageSyncOperations } from './operations/images'
import { _Object, _Request, db } from './db'
import { SyncAPIEvents } from './events'
import { Project } from '@/types/types'
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
  events = SyncAPIEvents;
  bgSyncInterval: NodeJS.Timeout | null = null
  loopingInterval: NodeJS.Timeout | null = null

  // Define Sub-APIs
  organizations = new OrganizationSyncOperations()
  projects = new ProjectSyncOperations()
  appliances = new ApplianceSyncOperations()
  electrical = new ElectricalSyncOperations()
  envelopes = new EnvelopeSyncOperations()
  rooms = new RoomSyncOperations()
  images = new ImageSyncOperations()

  // Metadata
  lastOnlineStatus: 'online'| 'offline' = 'online';

  init () {
    clearInterval(this.loopingInterval!);
    this.loopingInterval = setInterval(this._loop, 200);

    this.events.on('did-push-requests', (requests: _Request[]) => {
      requests.map(async (request) => {
        // NOTE: This is kind of brute force.
        const body = (request.options?.body ?? {}) as {projectId?: string, id?: string} ;
        const projectID = body?.projectId ?? body?.id;
        if (projectID) {
          this.projects._fetchAndUpdateDB(projectID)
        }
      });
    })

    this.events.on('did-modify-object', (objectID: string, value: _Object | null) => {
      if (value?.type === 'Project') {
        this.events.emit('on-modify-project', value.id, value.json as Project)
      }
      // Just forwarding all deletes over.
      if (!value) {
        this.events.emit('on-modify-project', objectID, null)
      }
    })
  }

  sync = async () => {
    if (!this.loopingInterval) this.init();
    if (!isOnline()) {
      console.warn('Ignore sync, is offline...')
      return
    }
    await this.pushChanges()
    await this.pullLatest()
  }

  pushChanges = async () => {
    return await db.publishChanges()
  }

  pullLatest = async () => {
    const projects = await this.projects.list()
    projects.forEach((p) => {
      this.projects.get(p.id!)
    })
  }

  setBackgroundSync = (enabled: boolean, intervalMS: number = 5000) => {
    clearInterval(this.bgSyncInterval!)
    if (enabled) {
      this.bgSyncInterval = setInterval(this.sync, intervalMS)
    }
  }

  _loop = () => {
    this._loopTaskCheckPending();
    this._loopTaskCheckOnline();
  }

  _loopTaskCheckPending = async () => {
    const status = await db.hasPendingChanges();
    this.events.emit('has-pending-changes', status);
  }

  _loopTaskCheckOnline = async () => {
    const currentStatus = isOnline() ? 'online' : 'offline';
    if (currentStatus !== this.lastOnlineStatus) {
      this.events.emit(`did-go-${currentStatus}`, Date.now());
    }
    this.lastOnlineStatus = currentStatus;
  }
}

export const SyncAPI = new _SyncAPI()
