import { NewProject, Project } from '@/types/types';
import { makeAutoObservable, observable } from 'mobx';
import customFetch from '../helpers/customFetch';
import { v4 as uuidv4 } from 'uuid';

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

    initialLoad = async () => {
        console.log('Fetching project');

        if (this.projectsByID.size > 0) {
          console.log("skipping because already loaded");
          return;
        }
        
        try {
          const response = await customFetch("/api/projects/");
          if (!response.ok) {
            throw new Error('Failed to fetch projects');
          }
    
          const data = await response.json();
          const projectsWithFormattedDate = data.map((project: Project) => ({
            ...project,
            createdAt: new Date(project.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          }));

          for (const proj of projectsWithFormattedDate) {
            this.projectsByID.set(proj.id, proj);
          }
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
    }

    getProject = async (projectId: string) => {
        return this.projectsByID.get(projectId);
    }

    createProject = async (newProject: NewProject) => {
        try {
            newProject.id = uuidv4();
        
            const response = await customFetch("/api/projects/", {
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
              const project : Project = { ...newProject, createdAt: '-1'} as Project;
              this.projectsByID.set(project.id, project);
              console.info("Network error, will retry later");
              return;
            }
            console.error('Error creating project:', error);
          }
    }

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
            const response = await customFetch(`/api/projects/${project.id}`, {
             method: 'PATCH',
             body: JSON.stringify(project),
            });
    
            if (!response.ok) {
              throw new Error('Failed to update project');
            }
            const found = this.getProject(project.id);
            Object.assign(found, project);
  
        } catch (error) {

          if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
            // ok
            const found = this.getProject(project.id);
            Object.assign(found, project);
            console.info("Network error, will retry later");
            return;
          }

            console.error('Error updating project:', error);
            throw error;
        }
    }


}

const ModelStore = new _ModelStore();
export default ModelStore;