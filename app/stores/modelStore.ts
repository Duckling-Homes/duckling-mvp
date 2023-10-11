import { NewProject, Project } from '@/types/types';
import { makeAutoObservable } from 'mobx';
import customFetch from '../helpers/customFetch';

export class _ModelStore {
    projectsByID: Map<string, Project> = new Map();

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
        if (this.projects.length === 0) {
            await this.loadProjects();
        }

        return this.projectsByID.get(projectId);
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

    // TODO: Need to build in auto update detection.
}

const ModelStore = new _ModelStore();
export default ModelStore;