import { Organization, Project, ProjectData } from '@/types/types';
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
    const project = await SyncManager.projects.get(projectId);
    const toUpdate = this.projectsByID.get(projectId);
    if (toUpdate) {
      Object.assign(toUpdate, project);
    } else {
      this.projectsByID.set(projectId, project);
    }
    this.currentProject = project;
    return project;
  }

  clearCurrentProject() {
    this.currentProject = null;
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
    if (this.currentProject?.id === projectId) {
      this.currentProject.data = data;
    }
    const project = this.projectsByID.get(projectId)!;
    project.data = data;
    this.projectsByID.set(projectId, project)
  }

  fetchOrganization = async (organizationId: string) => {
    this.organization = await SyncManager.organizations.get(organizationId)
  }
}

const ModelStore = new _ModelStore();
export default ModelStore;