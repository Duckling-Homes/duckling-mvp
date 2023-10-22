/**
 * This module maintains all code in regards to the "Sync Layer" 
 * which serves to synchronize the changes between local db & remote,
 * the main access point being the APISyncManager. 
 * 
 * 
 * Guiding principles:
 * - All reads and writes must use the objects db as the source of truth.
 * - Only reads can happen directly against the API and should happen after publishing changes. 
 * - All writes must be queued against the outbound requests db.
 * - For reading data, flush the outbound requests before pulling in new data.
 * 
 */
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { Organization, Project, ProjectAppliance, ProjectData } from '@/types/types';

const isOnline = () => {
    return navigator?.onLine;
}

const publishChanges = async () => {
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

const synchronizedFetch = async (url: string, options?: RequestInit) => {
    await publishChanges();
    return fetch(url, options);
}

class OrganizationSyncOperatsions {
    get = async (organizationID: string) => {
        if (isOnline()) {
            const response = await synchronizedFetch(`/api/organizations/${organizationID}`, {
                method: 'GET',
              })
            const org: Organization = await response.json();
            await db.putObject({ id: organizationID, type: "Organizations", json: org});
        }

        const resp = await db.objects.where("id").equals(organizationID).first();
        return resp?.json as Organization;
    }
}

class ProjectSyncOperations {

    list = async () => {
        if (isOnline()) {
            await this._doSyncList();
        }

        const objs = await db.objects.where("type").equals("Project").toArray();
        return objs.map(obj => obj.json) as Project[];
      }

      _doSyncList = async () => {
        const response = await synchronizedFetch("/api/projects/");
        const projectList: Project[] = await response.json();
        // Clear all stored projects
        await db.objects.where('type').equals('Project').delete();
        await Promise.all(projectList.map((proj) => {
          db.putObject({ id: proj.id!, type: "Project", json: proj})
        }))
      }
    
      get = async (projectID: string) => {
        if (isOnline()) {
            await this._doSyncGet(projectID);
        }    
        const obj = await db.objects.where("id").equals(projectID).first();
        console.log("GOT", projectID, obj?.json);
        return obj?.json as Project;
      }

      _doSyncGet = async (projectID: string) => {
        const response = await synchronizedFetch(`/api/projects/${projectID}`, {
            method: 'GET',
          });
          const proj: Project = await response.json();
          await db.putObject({ id: proj.id!, type: "Project", json: proj});
      }
    
      update = async (project: Project) => {
        await db.enqueueRequest(`/api/projects/${project.id}`, { method: 'PATCH', body: JSON.stringify(project)});
        await db.putObject({ id: project.id!, type: "Project", json: project});
        SyncAPI.pushChanges();
        return project;
      }

      updateProjectData = async (projectID: string, data: ProjectData) => {
        await db.enqueueRequest(`/api/projects/${projectID}/data`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        this._mutateDBProject(projectID, (proj) => {
            proj.data = data;
            return proj;
        })
        SyncAPI.pushChanges();
        return data;
      }
    
      create = async (project: Project) => {
        if (!project.id) {
          project.id = uuidv4();
        }
        await db.enqueueRequest("/api/projects/", { method: 'POST', body: JSON.stringify(project)});
        await db.putObject({ id: project.id!, type: "Project", json: project});
        SyncAPI.pushChanges();
        return project;
      }
    
      delete = async (projectID: string) => {
        await db.enqueueRequest(`/api/projects/${projectID}`, { method: 'DELETE' });
        await db.removeObject(projectID);
        SyncAPI.pushChanges();
      }

      _mutateDBProject = async (projectID: string, edit: (project: Project) => Project) => {
        const project = await this.get(projectID);
        const edited = edit(project);
        db.putObject({ id: project.id!, type: "Project", json: edited});
      }
}


class ApplianceSyncOperations {

    create = async (projectID: string, applianceType: string, appliance: ProjectAppliance) => {
        appliance.id = uuidv4();
        await db.enqueueRequest(`/api/appliances/${applianceType}`, {
            method: 'POST',
            body: JSON.stringify({
                ...appliance,
                projectId: projectID
              })
        });

        await SyncAPI.projects._mutateDBProject(projectID, (proj) => {
            proj.appliances = proj.appliances ?? [];
            proj.appliances.push(appliance);
            return proj;
        });
        return appliance
    }

    update = async (projectID: string, applianceType: string, appliance: ProjectAppliance) => {
        await db.enqueueRequest(`/api/appliances/${applianceType}/${appliance.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              ...appliance,
              projectId: projectID
            })
        });

        await SyncAPI.projects._mutateDBProject(projectID, (proj) => {
            const idx = proj.appliances?.findIndex(app => app.id === appliance.id)
            if (idx) {
                proj.appliances?.splice(idx, 1)
            }
            proj.appliances?.push(appliance);
            return proj;
        });

        return appliance;
    }

    delete = async (projectID: string, applianceType: string, applianceId: string) => {
        await db.enqueueRequest(`/api/appliances/${applianceType}/${applianceId}`, {
            method: 'DELETE',
        })

        await SyncAPI.projects._mutateDBProject(projectID, (proj) => {
            const idx = proj.appliances?.findIndex(app => app.id === applianceId)
            if (idx) {
                proj.appliances?.splice(idx, 1)
            }
            return proj;
        });
    }
}


class EnvelopeSyncOperations {
    create = async () => {

    }

    update = async () => {

    }

    delete = async () => {
        
    }

}

class ElectricalSyncOperations {
    create = async () => {

    }

    update = async () => {

    }

    delete = async () => {
        
    }

}

class RoomSyncOperations {
    create = async () => {

    }

    update = async () => {

    }

    delete = async () => {
        
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
    organizations = new OrganizationSyncOperatsions();
    projects = new ProjectSyncOperations();
    appliances = new ApplianceSyncOperations();
    electrical = new ElectricalSyncOperations();
    envelopes = new EnvelopeSyncOperations();
    rooms = new RoomSyncOperations();

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

    pushChanges = publishChanges;
  
    pullLatest = async () => {
        const projects = await this.projects.list();
        projects.forEach(p => {
            this.projects.get(p.id!)
        })
    }
  }

  export const SyncAPI = new APISyncManager();