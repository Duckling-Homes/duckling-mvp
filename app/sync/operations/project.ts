import { v4 as uuidv4 } from 'uuid'
import { db } from '../db'
import { Project, ProjectData } from '@/types/types'
import { isOnline, synchronizedFetch } from '../utils'
import { SyncAPI } from '..'
import { syncAPImutation } from '.'

export class ProjectSyncOperations {

  list = async () => {
    if (isOnline()) {
      await this._pullProjectsFromAPI()
    }
    const objs = await db.objects.where('type').equals('Project').toArray()
    return objs.map((obj) => obj.json) as Project[]
  }

  _pullProjectsFromAPI = async () => {
    const response = await synchronizedFetch('/api/projects/')
    const projectList: Project[] = await response.json();

    await Promise.all(
      projectList?.map((proj) => {
        const found = db.objects.get(proj.id!) ?? {};
        const updated = {...found, ...proj};
        db.putObject({ id: proj.id!, type: 'Project', json: updated, source: 'api'})
      })
    )
  }

  get = syncAPImutation(async (projectID: string) => {
    // Only pull latest if last view was not written by client
    let obj = await db.objects.where('id').equals(projectID).first();
  
    switch (obj?.source) {
      case 'client': 
        break;

      case undefined:
      case 'api':
      default:
        await this._pullProjectFromAPI(projectID);
        obj = await db.objects.where('id').equals(projectID).first();
    }

    console.log('GOT', projectID, obj?.json);
    return obj?.json as Project
  })

  _pullProjectFromAPI = async (projectID: string) => {
    if (!isOnline()) return;
    
    const response = await synchronizedFetch(`/api/projects/${projectID}`, {
      method: 'GET',
    })
    const proj: Project = await response.json();

    if (projectID && proj) {
      await db.putObject({ id: proj.id!, type: 'Project', json: proj, source: 'api' })
    }
  }

  update = syncAPImutation(async (project: Project) => {
    await db.enqueueRequest(`/api/projects/${project.id}`, {
      method: 'PATCH',
      body: JSON.stringify(project),
    })
    await db.putObject({ id: project.id!, type: 'Project', json: project, source: 'client' })
    SyncAPI.pushChanges()
    return project
  })

  updateProjectData = syncAPImutation(async (projectID: string, data: ProjectData) => {
    await db.enqueueRequest(`/api/projects/${projectID}/data`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    this._swap(projectID, (proj) => {
      proj.data = data
      return proj
    })
    SyncAPI.pushChanges()
    return data
  })

  create = syncAPImutation(async (project: Project) => {
    project.id = project.id ?? uuidv4()
    await db.enqueueRequest('/api/projects/', {
      method: 'POST',
      body: JSON.stringify(project),
    })
    await db.putObject({ id: project.id!, type: 'Project', json: project, source: 'client' })
    SyncAPI.pushChanges()
    return project
  })

  delete = syncAPImutation(async (projectID: string) => {
    await db.enqueueRequest(`/api/projects/${projectID}`, { method: 'DELETE' })
    await db.removeObject(projectID)
    SyncAPI.pushChanges()
  })

  _swap = async (projectID: string, edit: (project: Project) => Project) => {
    const project = await this.get(projectID)
    const edited = edit(project)
    db.putObject({ id: project.id!, type: 'Project', json: edited , source: 'client'})
  }
}
