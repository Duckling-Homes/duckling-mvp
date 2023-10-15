import React, { createContext, useContext, useState, ReactNode } from "react";
import { Project } from "@/types/types";
import ModelStore from "@/app/stores/modelStore";
import { observer } from "mobx-react-lite";

interface ProjectContextProps {
  currentProject: Project | null;
  fetchProject: (projectId: string) => Promise<void>;
  patchProject: (project: Project) => Promise<void>;
  clearCurrentProject: () => void;
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
    const project = await ModelStore.fetchProject(projectId);
    if (!project) {
         throw new Error("Failed to fetch project");
    }
    setCurrentProject(project);
  }

  async function patchProject(project: Project) {
    return ModelStore.patchProject(project);
  }

  function clearCurrentProject() {
    setCurrentProject(null);
  }

  const contextValue: ProjectContextProps = {
    currentProject,
    fetchProject,
    patchProject,
    clearCurrentProject,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
});
