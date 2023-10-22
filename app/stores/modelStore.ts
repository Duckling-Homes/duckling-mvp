import { Organization, Project, ProjectData } from '@/types/types';
import { makeAutoObservable, observable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';


// Data Sync Manager
class APISyncManager {


  constructor() {

  }

  get isOnline () {
    return navigator.onLine
  }


  // Implement all APIs with Offline fallback
  listProjects = async () => {
    console.log("IS ONLINE?", this.isOnline);
    if (this.isOnline) {
      const response = await fetch("/api/projects/");
      const projectList: Project[] = await response.json();
      await db.objects.where('type').equals('Project').delete();
      await Promise.all(projectList.map((proj) => {
        db.putObject({ id: proj.id!, type: "Project", json: proj})
      }))
      console.log("Populated index with", projectList);

    }
    const objs = await db.objects.where("type").equals("Project").toArray();
    return objs.map(obj => obj.json) as Project[];
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

  initialLoad = async () => {
    console.log('Fetching project');
    this.apiSyncManager.listProjects()
    .then(res => console.log("LIST PROJECT RESULT", res));

    if (this.projectsByID.size > 0) {
      console.log("skipping because already loaded");
      return;
    }
    
    try {
      const response = await fetch("/api/projects/");
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      const projectsWithFormattedDate = data.map((project: Project) => ({
        ...project,
        createdAt: project.createdAt
          ? new Date(project.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : undefined,
      }));

      for (const proj of projectsWithFormattedDate) {
        this.projectsByID.set(proj.id, proj);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  fetchProject = async (projectId: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }

      const data = await response.json();
      this.currentProject = data;
      return this.currentProject;
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  }

  clearCurrentProject() {
    this.currentProject = null;
  }

  // TODO: Need to build offline path for this guy - may require generating id
  createProject = async (newProject: Project) => {
    try {
      newProject.id = uuidv4();
  
      const response = await fetch("/api/projects/", {
        method: 'POST',
        body: JSON.stringify(newProject),
      });

      if (!response?.ok) {
        throw new Error('Failed to create project');
      }

      const project = await response.json();
      this.projectsByID.set(project.id, project);

    } catch (error) {
      if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        // ok
        const project: Project = { ...newProject, createdAt: '-1' } as Project;
        if (project.id) {
          this.projectsByID.set(project.id, project);
          console.info("Network error, will retry later");
        } else {
          console.error("Project ID is undefined");
        }
        return;
      }
    }
  }

  deleteProject = async (projectId: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      this.projectsByID.delete(projectId);
    } catch (error) {

      if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        // ok
        this.projectsByID.delete(projectId);
        console.info("Network error, will retry later");
        return;
      }

      console.error('Error deleting project:', error);
    }
  }

  patchProject = async (project: Project) => {
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'PATCH',
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      if (project.id) {
        const found = this.fetchProject(project.id);
        Object.assign(found, project);
      } else {
        console.error("Project ID is undefined");
      }

    } catch (error) {

      if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        // ok
        if (project.id) {
          const found = this.fetchProject(project.id);
          Object.assign(found, project);
          console.info("Network error, will retry later");
          return;
        } else {
          console.error("Project ID is undefined");
          return; 
        }
      }

      console.error('Error updating project:', error);
      throw error;
    }
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
