import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { Organization, Project, ProjectData } from '@/types/types';

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