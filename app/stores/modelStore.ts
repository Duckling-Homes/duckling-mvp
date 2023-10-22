import { Organization, Project, ProjectAppliance, ProjectData } from '@/types/types';
import { makeAutoObservable, observable } from 'mobx';
import { SyncManager } from './sync';

/**
 * ModelStore is the reactive layer on top of our SyncManager.
 * It should wrap SyncManager APIs to do CRUD and update its own 
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
    SyncManager.setBackgroundSync(true, 15000);
    await SyncManager.sync();
    const projects = await SyncManager.projects.list();
    for (const proj of projects) {
      this.projectsByID.set(proj.id!, proj);
    }
  }

  setCurrentProject = async (projectId: string) => {
    const project = await this.getProject(projectId);
    this.currentProject = project;
    return project;
  }

  clearCurrentProject() {
    this.currentProject = null;
  }

  getProject = async (projectID: string) => {
    const project = await SyncManager.projects.get(projectID);
    if (this.currentProject?.id === projectID) {
      this.currentProject = project;
    }
    this.projectsByID.set(projectID, project);
    return project;
  }

  createProject = async (newProject: Project) => {
    const created = await SyncManager.projects.create(newProject);
    this.projectsByID.set(created.id!, created);
    return created;
  }

  deleteProject = async (projectId: string) => {
    await SyncManager.projects.delete(projectId);
    this.projectsByID.delete(projectId);
  }

  patchProject = async (project: Project) => {
    const updated = await SyncManager.projects.update(project);
    if (this.currentProject?.id === project.id) {
      this.currentProject = updated;
    }
    this.projectsByID.set(updated.id!, updated);
    return updated;
  }

  patchProjectData = async (projectId: string, projectData: ProjectData) => {
    const data = await SyncManager.projects.updateProjectData(projectId, projectData);
    this.getProject(projectId);
    return data;
  }

  fetchOrganization = async (organizationId: string) => {
    this.organization = await SyncManager.organizations.get(organizationId)
    return this.organization;
  }

  createAppliance = async (projectID: string, applianceType: string, appliance: ProjectAppliance) => {
    const created = await SyncManager.appliances.create(projectID, applianceType, appliance);
    await this.getProject(projectID);
    return created;
  }

  updateAppliance = async (projectID: string, applianceType: string, appliance: ProjectAppliance) => {
    const updated = await SyncManager.appliances.update(projectID, applianceType, appliance);
    await this.getProject(projectID);
    return updated;
  }

  deleteAppliance = async (projectID: string, applianceType: string, applianceId: string) => {
    await SyncManager.appliances.delete(projectID, applianceType, applianceId);
    await this.getProject(projectID);
  }

}

const ModelStore = new _ModelStore();
export default ModelStore;