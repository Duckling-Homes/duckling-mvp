'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { NewProject, Project } from "@/types/types";

import customFetch from "@/app/helpers/customFetch";


// Define the shape of the context
interface ProjectContextProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  fetchProjects: () => Promise<Project[]>;
  createProject: (newProject: NewProject) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined
);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};

export const ProjectProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {

  const [projects, setProjects] = useState<Project[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  const contextValue: ProjectContextProps = {
    projects,
    setProjects,
    fetchProjects,
    createProject,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};
