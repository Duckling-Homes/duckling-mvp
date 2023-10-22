import { Organization, Project, ProjectAppliance, ProjectData, ProjectEnvelope, ProjectRoom } from '@/types/types';
import { makeAutoObservable, observable } from 'mobx';
import { SyncAPI } from './sync';

/**
 * ModelStore is the reactive layer on top of our SyncAPI which treats local storage
 * as source of truth. 
 * ***NO FETCH CALLS ARE ALLOWED FROM FRONT-END CODE.*** Any fetching is to happen in Sync layer.
 * 
 * ModelStore simply wraps SyncAPI to do CRUD and update MobX
 * properties so that UI components can get automatic updates on the changes.
 */
export class _ModelStore {
  projectsByID: Map<string, Project> = observable.map(new Map());
  currentProject: Project | null = null;
  organization: Organization | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get projects () {
    return Array.from(this.projectsByID.values())
  }

  init = async () => {
    SyncAPI.setBackgroundSync(true, 15000);
    await SyncAPI.sync();
    const projects = await SyncAPI.projects.list();
    for (const proj of projects) {
      this.projectsByID.set(proj.id!, proj);
    }
  }

  setCurrentProject = async (projectId: string) => {
    const project = await this.loadProject(projectId);
    this.currentProject = project;
    return project;
  }

  clearCurrentProject() {
    this.currentProject = null;
  }

  loadProject = async (projectID: string) => {
    const project = await SyncAPI.projects.get(projectID);
    if (this.currentProject?.id === projectID) {
      this.currentProject = project;
    }
    this.projectsByID.set(projectID, project);
    return project;
  }

  createProject = async (newProject: Project) => {
    const created = await SyncAPI.projects.create(newProject);
    this.projectsByID.set(created.id!, created);
    return created;
  }

  deleteProject = async (projectId: string) => {
    await SyncAPI.projects.delete(projectId);
    this.projectsByID.delete(projectId);
  }

  patchProject = async (project: Project) => {
    const updated = await SyncAPI.projects.update(project);
    if (this.currentProject?.id === project.id) {
      this.currentProject = updated;
    }
    this.projectsByID.set(updated.id!, updated);
    return updated;
  }

  patchProjectData = async (projectId: string, projectData: ProjectData) => {
    const data = await SyncAPI.projects.updateProjectData(projectId, projectData);
    this.loadProject(projectId);
    return data;
  }

  fetchOrganization = async (organizationId: string) => {
    this.organization = await SyncAPI.organizations.get(organizationId)
    return this.organization;
  }

  createAppliance = async (projectID: string, applianceType: string, appliance: ProjectAppliance) => {
    const created = await SyncAPI.appliances.create(projectID, applianceType, appliance);
    await this.loadProject(projectID);
    return created;
  }

  updateAppliance = async (projectID: string, applianceType: string, appliance: ProjectAppliance) => {
    const updated = await SyncAPI.appliances.update(projectID, applianceType, appliance);
    await this.loadProject(projectID);
    return updated;
  }

  deleteAppliance = async (projectID: string, applianceType: string, applianceId: string) => {
    await SyncAPI.appliances.delete(projectID, applianceType, applianceId);
    await this.loadProject(projectID);
  }

  createRoom = async (projectID: string, room: ProjectRoom) => {
    const created = await SyncAPI.rooms.create(projectID, room);
    await this.loadProject(projectID);
    return created;
  }

  updateRoom = async (projectID: string, room: ProjectRoom) => {
    const updated = await SyncAPI.rooms.update(projectID, room);
    await this.loadProject(projectID);
    return updated;
  }

  deleteRoom = async (projectID: string, roomID: string) => {
    await SyncAPI.rooms.delete(projectID, roomID);
    await this.loadProject(projectID);
  }

  createEnvelope = async (projectID: string, envelope: ProjectEnvelope) => {
    const created = await SyncAPI.envelopes.create(projectID, envelope);
    await this.loadProject(projectID);
    return created;
  }

  updateEnvelope = async (projectID: string, envelope: ProjectEnvelope) => {
    const updated = await SyncAPI.envelopes.update(projectID, envelope);
    await this.loadProject(projectID);
    return updated;
  }

  deleteEnvelope = async (projectID: string, envelopeType: string, envelopeID: string) => {
    await SyncAPI.envelopes.delete(projectID, envelopeType, envelopeID);
    await this.loadProject(projectID);
  }

}

const ModelStore = new _ModelStore();
export default ModelStore;