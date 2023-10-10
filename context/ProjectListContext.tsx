'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { NewProject, Project } from "@/types/types";

import customFetch from "@/app/helpers/customFetch";

interface ProjectListContextProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  fetchProjects: () => Promise<void>;
  createProject: (newProject: NewProject) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
}

const ProjectListContext = createContext<ProjectListContextProps | undefined>(
  undefined
);

export const useProjectListContext = () => {
  const context = useContext(ProjectListContext);
  if (!context) {
    throw new Error("useProjectListContext must be used within a ProjectProvider");
  }
  return context;
};

export const ProjectListProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
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

      setProjects(projectsWithFormattedDate);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  async function createProject(newProject: NewProject) {
    try {
      const response = await customFetch("/api/projects/", {
        method: 'POST',
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      await fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  }

  async function deleteProject(projectId: string) {
    try {
      const response = await customFetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      await fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }

  const contextValue: ProjectListContextProps = {
    projects,
    setProjects,
    fetchProjects,
    createProject,
    deleteProject,
  };

  return (
    <ProjectListContext.Provider value={contextValue}>
      {children}
    </ProjectListContext.Provider>
  );
};
