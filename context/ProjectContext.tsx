import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { NewProject, Project } from "@/types/types";
import customFetch from "@/app/helpers/customFetch";

interface ProjectContextProps {
  currentProject: Project | null;
  fetchProject: (projectId: string) => Promise<void>;
  patchProject: (project: Project) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  async function fetchProject(projectId: string) {
    try {
      const response = await customFetch(`/api/projects/${projectId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }

      const data = await response.json();
      setCurrentProject(data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  }

  async function patchProject(project: Project) {
    try {
      const response = await customFetch(`/api/project${project.id}`, {
        method: 'PATCH',
        body: JSON.stringify(project),
      })

      const data = await response.json();
      setCurrentProject(data);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  }

  const contextValue: ProjectContextProps = {
    currentProject,
    fetchProject,
    patchProject,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};
