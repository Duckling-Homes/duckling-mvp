import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { NewProject, Project } from "@/types/types";
import customFetch from "@/app/helpers/customFetch";
import ModelStore from "@/app/stores/modelStore";
import { observer } from "mobx-react-lite";

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

export const ProjectProvider: React.FC<{ children: ReactNode }> = observer(({ children }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  async function fetchProject(projectId: string) {
    const project = await ModelStore.getProject(projectId);
    if (!project) {
         throw new Error("Failed to fetch project");
    }
    setCurrentProject(project);
  }

  async function patchProject(project: Project) {
    const projectFound = ModelStore.getProject(project.id);
    if (!projectFound) {
      throw new Error("Project not found");
    }

    Object.assign(projectFound, project);
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
});
