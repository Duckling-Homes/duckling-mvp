import {
  Organization,
  PhotoDetails,
  Project,
  ProjectAppliance,
  ProjectData,
  ProjectElectrical,
  ProjectEnvelope,
  ProjectRoom,
} from '@/types/types'
import { makeAutoObservable, observable, runInAction } from 'mobx'
import { SyncAPI } from '../sync'

/**
 * ModelStore is the reactive layer on top of our SyncAPI which treats local storage
 * as source of truth.
 * ***NO FETCH CALLS ARE ALLOWED FROM FRONT-END CODE.*** Any fetching is to happen in Sync layer.
 *
 * ModelStore simply wraps SyncAPI to do CRUD and update MobX
 * properties so that UI components can get automatic updates on the changes.
 */
export class _ModelStore {

  isInitialized = false

  projectsByID: Map<string, Project> = observable.map(new Map())
  currentProject: Project | null = null
  organization: Organization | null = null
  hasPendingChanges = false
  onlineStatus: 'online' | 'offline' = 'online';

  constructor() {
    makeAutoObservable(this)
  }

  get projects() {
    return Array.from(this.projectsByID.values())
  }

  init = async () => {
    if (this.isInitialized) return;

    this.isInitialized = true;
    SyncAPI.setBackgroundSync(true, 5 * 60 * 1000);

    // TODO: Charles - look into this...?
    // SyncAPI.events.on('did-sync', () => {
    //   console.log("ModelStore got didsync")
    //   for (const proj of this.projects) {
    //     this.syncProject(proj.id!);
    //   }
    // })

    SyncAPI.events.on('has-pending-changes', (status: boolean) => {
      runInAction(() => this.hasPendingChanges = status);
    });

    SyncAPI.events.on('did-go-online', (_) => {
      runInAction(() => {
        this.onlineStatus = 'online';
      });
    });

    SyncAPI.events.on('did-go-offline', (_) => {
      runInAction(() => {
        this.onlineStatus = 'offline';
      });
    });

    await SyncAPI.sync()
    const projects = await SyncAPI.projects.list({forceSync: true});
    for (const proj of projects) {
      if (!this.projectsByID.has(proj.id!)) {
        this.projectsByID.set(proj.id!, proj)
      }
    }
  }

  setCurrentProject = async (projectId: string) => {
    const project = await this.syncProject(projectId)
    this.currentProject = project
    return project
  }

  clearCurrentProject() {
    this.currentProject = null
  }

  // NOTE: This needs to be called after every mutation to trigger front-end callbacks for reactivity.
  syncProject = async (projectID: string) => {
    console.log('loading')
    this.init()

    const project = await SyncAPI.projects.get(projectID, {forceSync: true})
    if (this.currentProject?.id === projectID) {
      this.currentProject = project
    }
    this.projectsByID.set(projectID, project)
    return project
  }

  createProject = async (newProject: Project) => {
    const created = await SyncAPI.projects.create(newProject)
    this.projectsByID.set(created.id!, created);
    return created
  }

  deleteProject = async (projectId: string) => {
    await SyncAPI.projects.delete(projectId)
    this.projectsByID.delete(projectId)
  }

  patchProject = async (project: Project) => {
    const updated = await SyncAPI.projects.update(project)
    if (this.currentProject?.id === project.id) {
      this.currentProject = updated
    }
    this.projectsByID.set(updated.id!, updated)
    return updated
  }

  patchProjectData = async (projectId: string, projectData: ProjectData) => {
    const data = await SyncAPI.projects.updateProjectData(
      projectId,
      projectData
    )
    await this.syncProject(projectId)
    return data
  }

  fetchOrganization = async (organizationId: string) => {
    this.organization = await SyncAPI.organizations.get(organizationId, {forceSync: true})
    return this.organization
  }

  createAppliance = async (
    projectID: string,
    applianceType: string,
    appliance: ProjectAppliance
  ) => {
    const created = await SyncAPI.appliances.create(
      projectID,
      applianceType,
      appliance
    )
    await this.syncProject(projectID)
    return created
  }

  updateAppliance = async (
    projectID: string,
    applianceType: string,
    appliance: ProjectAppliance
  ) => {
    const updated = await SyncAPI.appliances.update(
      projectID,
      applianceType,
      appliance
    )
    await this.syncProject(projectID)
    return updated
  }

  deleteAppliance = async (
    projectID: string,
    applianceType: string,
    applianceId: string
  ) => {
    await SyncAPI.appliances.delete(projectID, applianceType, applianceId)
    await this.syncProject(projectID)
  }

  createRoom = async (projectID: string, room: ProjectRoom) => {
    const created = await SyncAPI.rooms.create(projectID, room)
    await this.syncProject(projectID)
    return created
  }

  updateRoom = async (projectID: string, room: ProjectRoom) => {
    const updated = await SyncAPI.rooms.update(projectID, room)
    await this.syncProject(projectID)
    return updated
  }

  deleteRoom = async (projectID: string, roomID: string) => {
    await SyncAPI.rooms.delete(projectID, roomID)
    await this.syncProject(projectID)
  }

  createEnvelope = async (projectID: string, envelope: ProjectEnvelope) => {
    const created = await SyncAPI.envelopes.create(projectID, envelope)
    await this.syncProject(projectID)
    return created
  }

  updateEnvelope = async (projectID: string, envelope: ProjectEnvelope) => {
    const updated = await SyncAPI.envelopes.update(projectID, envelope)
    await this.syncProject(projectID)
    return updated
  }

  deleteEnvelope = async (
    projectID: string,
    envelopeType: string,
    envelopeID: string
  ) => {
    await SyncAPI.envelopes.delete(projectID, envelopeType, envelopeID)
    await this.syncProject(projectID)
  }

  createElectrical = async (
    projectID: string,
    electrical: ProjectElectrical
  ) => {
    const created = await SyncAPI.electrical.create(projectID, electrical)
    await this.syncProject(projectID)
    return created
  }

  updateElectrical = async (
    projectID: string,
    electrical: ProjectElectrical
  ) => {
    const updated = await SyncAPI.electrical.update(projectID, electrical)
    await this.syncProject(projectID)
    return updated
  }

  deleteElectrical = async (
    projectID: string,
    electricalType: string,
    electricalID: string
  ) => {
    await SyncAPI.electrical.delete(projectID, electricalType, electricalID)
    await this.syncProject(projectID)
  }

  createPhotoEntry = async (
    projectID: string,
    imgDataUrl: string,
    photoDetails: PhotoDetails
  ) => {
    const created = await SyncAPI.images.create(
      projectID,
      imgDataUrl,
      photoDetails
    )
    await this.syncProject(projectID)
    return created
  }

  downloadPhoto = async (imageID: string) => {
    return await SyncAPI.images.download(imageID)
  }

  patchPhotoDetails = async (projectID: string, photoDetails: PhotoDetails) => {
    const updated = await SyncAPI.images.update(projectID, photoDetails)
    await this.syncProject(projectID)
    return updated
  }

  deletePhoto = async (projectID: string, imageID: string) => {
    await SyncAPI.images.delete(projectID, imageID)
    await this.syncProject(projectID)
  }
}

const ModelStore = new _ModelStore()
export default ModelStore
