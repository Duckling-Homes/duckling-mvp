import { Organization, Project, ProjectData } from '@/types/types';
import { makeAutoObservable, observable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';


// Data Sync Manager - Data Access Layer
class APISyncManager {

  /**
   * 
   * NOTE: ONLY READS ARE ALLOWED TO FETCH DATA DIRECTLY
   */

  // Projects -- READ --
  listProjects = async () => {
    if (this.isOnline) {
      const response = await fetch("/api/projects/");
      const projectList: Project[] = await response.json();
      // Clear all stored projects
      await db.objects.where('type').equals('Project').delete();
      await Promise.all(projectList.map((proj) => {
        db.putObject({ id: proj.id!, type: "Project", json: proj})
      }))
    }

    const objs = await db.objects.where("type").equals("Project").toArray();
    return objs.map(obj => obj.json) as Project[];
  }

  getProject = async (projectID: string) => {
    if (this.isOnline) {
      const response = await fetch(`/api/projects/${projectID}`, {
        method: 'GET',
      });
      const proj: Project = await response.json();
      await db.putObject({ id: proj.id!, type: "Project", json: proj});
    }

    const obj = await db.objects.where("id").equals(projectID).first();
    return obj?.json as Project;
  }


  updateProject = async (project: Project) => {
    await db.enqueueRequest(`/api/projects/${project.id}`, { method: 'PATCH', body: JSON.stringify(project)});
    await db.putObject({ id: project.id!, type: "Project", json: project});
    this.pushChanges();
    return project;
  }

  createProject = async (project: Project) => {
    if (!project.id) {
      project.id = uuidv4();
    }
    await db.enqueueRequest("/api/projects/", { method: 'POST', body: JSON.stringify(project)});
    await db.putObject({ id: project.id!, type: "Project", json: project});
    this.pushChanges();
    return project;
  }

  deleteProject = async (projectID: string) => {
    await db.enqueueRequest(`/api/projects/${projectID}`, { method: 'DELETE' });
    await db.removeObject(projectID);
    this.pushChanges();
  }

  sync = async () => {
    if (!this.isOnline) {
      console.warn("Ignore sync, is offline...");
      return;
    }
    await this.pushChanges();
    await this.pullLatest();
  }

  private pushChanges = async () => {
    if (!this.isOnline) return;

    let nextReq;
    do {
      try {
        nextReq = await db.peekNextRequest();
        if (nextReq) {
          await fetch(nextReq!.url, nextReq!.options);
          await db.dequeueRequest(nextReq.id!);
        }
      } catch (err) {
        console.error("REQUEST FAILED TO PUSH...", {nextReq, err});
      }
    } while (nextReq)
  }

  private pullLatest = async () => {
    this.listProjects();
  }


  get isOnline () {
    return navigator.onLine
  }
}


// Note: Today, just using 1 ModelStore to store all state for all objects for simplicity
// In the future we may want to split by Object type.
export class _ModelStore {
  // TODO: Make two modelStore?
  projectsByID: Map<string, Project> = observable.map(new Map());
  currentProject: Project | null = null;
  organization: Organization | null = null;

  apiSyncManager = new APISyncManager();

  constructor() {
    makeAutoObservable(this, {
      currentProject: observable,
    });
  }

  get projects () {
    return Array.from(this.projectsByID.values())
  }

  // TODO: Remove this
  initialLoad = async () => {
    await this.apiSyncManager.sync();
    const projects = await this.apiSyncManager.listProjects();
    for (const proj of projects) {
      this.projectsByID.set(proj.id!, proj);
    }
  }

  setCurrentProject = async (projectId: string) => {
    const project = await this.apiSyncManager.getProject(projectId);
    const toUpdate = this.projectsByID.get(projectId);
    if (toUpdate) {
      Object.assign(toUpdate, project);
    } else {
      this.projectsByID.set(projectId, project);
    }

    console.log("GOT", project);
    this.currentProject = project;
    return project;
  }

  clearCurrentProject() {
    this.currentProject = null;
  }

  // TODO: Need to build offline path for this guy - may require generating id
  createProject = async (newProject: Project) => {
    const created = await this.apiSyncManager.createProject(newProject);
    this.projectsByID.set(created.id!, created);
    return created;
  }

  deleteProject = async (projectId: string) => {
    await this.apiSyncManager.deleteProject(projectId);
    this.projectsByID.delete(projectId);
  }

  patchProject = async (project: Project) => {
    const updated = await this.apiSyncManager.updateProject(project);

    if (this.currentProject?.id === project.id) {
      this.currentProject = updated;
    }

    this.projectsByID.set(updated.id!, updated);

    return updated;
  }

  patchProjectData = async (projectId: string, projectData: ProjectData) => {
    try {
      const response = await fetch(`/api/projects/${projectId}/data`, {
        method: 'POST',
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
      throw new Error('Failed to update project data');
      }

      const data = response.json();
      return data
    } catch (error) {
        console.error('Error updating project:', error);
    }
  }

  fetchOrganization = async (organizationId: string) => {
    try {
      if (organizationId) {
        const response = await fetch(`/api/organizations/${organizationId}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch organization');
        }

        const data = await response.json();
        this.organization = data;
        return data;
      } else {
        console.error('Organization ID is undefined');
      }
    } catch (error) {
      console.error('Error fetching Organization:', error);
    }
  }
}

const ModelStore = new _ModelStore();
export default ModelStore;


// New implementation plan...
// Screw workbox, will implement an indexdb queued loop
// Everything writes to indexdb and a consumer offloads the writes
// Essentially a write thru cache. **CQRS**

// Idea see if we can do it without service worker
/// use navigator.onLine

/****
 * .backgroundSync:
 *  if internet connected,
 *  -> Write all pending updates
 *  -> Pull all data down (pre-selected/pre-written): If internet, do fetches on the things that are 
 * 
 * .addProject
 * .updateProject
 * .removeProject
 * .getProject
 * .projects
 * .organizations
 * 
 * 
 * 
 */

// class _ModelStore2 {

//   projectsByID: Map<string, Project> = new Map()
//   organization?: string;
//   syncManager = new APISyncManager();

//   constructor () {
//     makeAutoObservable(this);
//   }

// }
