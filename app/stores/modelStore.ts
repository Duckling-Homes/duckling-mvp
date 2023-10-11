import { NewProject, Project } from '@/types/types';
import { makeAutoObservable } from 'mobx';
import customFetch from '../helpers/customFetch';

export class _ModelStore {
    projects: Project[] = [];

    constructor() {
        makeAutoObservable(this);
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
    
          this.projects = projectsWithFormattedDate;
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
    }

    // TODO: Need to build offline path for this guy
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
    
          await this.loadProjects();
        } catch (error) {
          console.error('Error deleting project:', error);
        }
    }

    // TODO: Need to build in auto update detection.
}

const ModelStore = new _ModelStore();
export default ModelStore;