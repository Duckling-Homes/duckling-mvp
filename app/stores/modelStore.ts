import { NewProject, Project, ProjectData } from '@/types/types';
import { makeAutoObservable, observable } from 'mobx';
import customFetch from '../helpers/customFetch';

// Note: Today, just using 1 ModelStore to store all state for all objects for simplicity
// In the future we may want to split by Object type.
export class _ModelStore {

    projectsByID: Map<string, Project> = observable.map(new Map());

    constructor() {
      makeAutoObservable(this);
    }

    get projects () {
      return Array.from(this.projectsByID.values())
    }

    loadProjects = async () => {
        console.log('Fetching project')
        try {
          const response = await customFetch("/api/projects/");
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

    getProject = async (projectId: string) => {
      try {
        const response = await customFetch(`/api/projects/${projectId}`, {
          method: 'GET',
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }

        const data = await response.json();
        return data
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    }

    // TODO: Need to build offline path for this guy - may require generating id
    createProject = async (newProject: NewProject) => {
        try {
            const response = await customFetch("/api/projects/", {
              method: 'POST',
              body: JSON.stringify(newProject),
            });
      
            if (!response.ok) {
              throw new Error('Failed to create project');
            }

            await this.loadProjects();
          } catch (error) {
            console.error('Error creating project:', error);
          }
    }

    // TODO: Need to build offline path for this guy
    deleteProject = async (projectId: string) => {
        try {
          const response = await customFetch(`/api/projects/${projectId}`, {
            method: 'DELETE',
          });
    
          if (!response.ok) {
            throw new Error('Failed to delete project');
          }
    
          this.projectsByID.delete(projectId);
        } catch (error) {
          console.error('Error deleting project:', error);
        }
    }

    // TODO: Need to build offline path for this guy
    patchProject = async (project: Project) => {
      try {
        if (project.id) {
          const response = await customFetch(`/api/projects/${project.id}`, {
            method: 'PATCH',
            body: JSON.stringify(project),
          });

          if (!response.ok) {
            throw new Error('Failed to update project');
          }

          const found = this.getProject(project.id);
          Object.assign(found, project);
        } else {
          console.error('Project ID is undefined; cannot update project.');
        }
      } catch (error) {
        console.error('Error updating project:', error);
      }
    }

    patchProjectData = async (projectId: string, projectData: ProjectData) => {
      try {
        const response = await customFetch(`/api/projects/${projectId}/data`, {
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
}

const ModelStore = new _ModelStore();
export default ModelStore;