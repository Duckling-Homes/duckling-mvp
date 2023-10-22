/**
 * This module maintains all code in regards to the "Sync Layer", the
 * main access point being the APISyncManager.
 * 
 * 
 * Guiding principles:
 * - All reads and writes must use the objects db as the source of truth.
 * - Only reads can happen directly against the API. 
 * - All writes must be queued against the outbound requests db.
 * - For syncs, flush the outbound requests before pulling in new data
 * 
 */
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { Project } from '@/types/types';

const isOnline = () => {
    return navigator?.onLine;
}

class ProjectSyncOperations {

    list = async () => {
        if (isOnline()) {
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
    
      get = async (projectID: string) => {
        if (isOnline()) {
          const response = await fetch(`/api/projects/${projectID}`, {
            method: 'GET',
          });
          const proj: Project = await response.json();
          await db.putObject({ id: proj.id!, type: "Project", json: proj});
        }
    
        const obj = await db.objects.where("id").equals(projectID).first();
        return obj?.json as Project;
      }
    
      update = async (project: Project) => {
        await db.enqueueRequest(`/api/projects/${project.id}`, { method: 'PATCH', body: JSON.stringify(project)});
        await db.putObject({ id: project.id!, type: "Project", json: project});
        SyncManager.pushChanges();
        return project;
      }
    
      create = async (project: Project) => {
        if (!project.id) {
          project.id = uuidv4();
        }
        await db.enqueueRequest("/api/projects/", { method: 'POST', body: JSON.stringify(project)});
        await db.putObject({ id: project.id!, type: "Project", json: project});
        SyncManager.pushChanges();
        return project;
      }
    
      delete = async (projectID: string) => {
        await db.enqueueRequest(`/api/projects/${projectID}`, { method: 'DELETE' });
        await db.removeObject(projectID);
        SyncManager.pushChanges();
      }
}

/**
 * This is the interface to access and mutate data for our app.
 * 
 * --- HOW IT WORKS ---
 * It uses an IndexDB (the objects table) as the source of truth for this app
 * and keeps that source of truth in sync with the API whenever internet is available.
 * When offline, it queues outbound requests in another IndexDB (the requests table) which
 * are executed whenever `.sync` comes online.
 * 
 * --- INTERACTING WITH OPERATIONS ---
 * Object-specific reads/writes are organized by sub-API. I.E. To update/read/create projects,
 * you will use SyncManager.projects.{operation}. These APIs read/write to IndexedDB and promise
 * eventually they will sync with API.
 * 
 * --- ON SYNCING ---
 * `.sync` expells pending changes and pulls in the latest from the API when online. 
 * Set `.setBackgroundSync` allows for configuring `.sync` to be fired on an interval. 
 * Configure any global data or necessary data for offline that needs to be refreshed 
 * in `.pullLatest`
 */
class APISyncManager {

    bgSyncInterval: NodeJS.Timeout | null = null;

    // Sub-APIs
    projects = new ProjectSyncOperations();

    sync = async () => {
      if (!isOnline()) {
        console.warn("Ignore sync, is offline...");
        return;
      }
      await this.pushChanges();
      await this.pullLatest();
    }

    setBackgroundSync = (enabled: boolean, intervalMS: number = 15000) => {
        clearInterval(this.bgSyncInterval!);
        if (enabled) {
            this.bgSyncInterval = setInterval(this.sync, intervalMS)
        }
    }
  
    pushChanges = async () => {
      if (!isOnline()) return;
  
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
  
    pullLatest = async () => {
        await this.projects.list();
    }
  }

  export const SyncManager = new APISyncManager();