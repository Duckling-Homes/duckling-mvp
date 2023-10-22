import { Organization, Project, ProjectData } from '@/types/types';
import { makeAutoObservable, observable } from 'mobx';
import { SyncManager } from './sync';

// Note: Today, just using 1 ModelStore to store all state for all objects for simplicity
// In the future we may want to split by Object type.
export class _ModelStore {
  // TODO: Make two modelStore?
  projectsByID: Map<string, Project> = observable.map(new Map());
  currentProject: Project | null = null;
  organization: Organization | null = null;

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
    console.log("GOT", project);
    this.currentProject = project;
    return project;
  }

  clearCurrentProject() {
    this.currentProject = null;
  }

  // TODO: Need to build offline path for this guy - may require generating id
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
