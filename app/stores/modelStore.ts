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
import { makeAutoObservable, observable } from 'mobx'
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

  projectsByID: Map<string, Project> = observable.map(new Map())
  currentProject: Project | null = null
  organization: Organization | null = null
  isInitialized = false
  hasPendingChanges = false

  constructor() {
    makeAutoObservable(this)
  }

  get projects() {
    return Array.from(this.projectsByID.values())
  }

  init = async () => {
    if (!this.isInitialized) {
      this.isInitialized = true
      SyncAPI.setBackgroundSync(true, 5 * 60 * 1000)
      SyncAPI.onNewChanges = this._onNewSyncAPIChanges
      SyncAPI.onPendingStatusUpdate = (status: boolean) => {
        this.hasPendingChanges = status;
      }
      await SyncAPI.sync()
      const projects = await SyncAPI.projects.list()
      for (const proj of projects) {
        if (!this.projectsByID.has(proj.id!)) {
          this.projectsByID.set(proj.id!, proj)
        }
      }
    }
  }

  _onNewSyncAPIChanges = () => {
    if (this.currentProject) {
      this.syncProject(this.currentProject.id!)
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
    const project = await SyncAPI.projects.get(projectID)
    if (this.currentProject?.id === projectID) {
      this.currentProject = project
    }
    this.projectsByID.set(projectID, project)
    return project
  }

  createProject = async (newProject: Project) => {
    const created = await SyncAPI.projects.create(newProject)
    this.projectsByID.set(created.id!, created)
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
    this.syncProject(projectId)
    return data
  }

  fetchOrganization = async (organizationId: string) => {
    this.organization = await SyncAPI.organizations.get(organizationId)
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
