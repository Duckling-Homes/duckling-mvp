'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { NewProject, Project } from "@/types/types";
import ModelStore from "@/app/stores/modelStore";
import { observer } from "mobx-react-lite";

interface ProjectListContextProps {
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
}> = observer(({ children }) => {

  useEffect(() => {
    ModelStore.initialLoad();
  }, []);

  async function createProject(newProject: NewProject) {
    return ModelStore.createProject(newProject);
  }

  async function deleteProject(projectId: string) {
    return ModelStore.deleteProject(projectId);
  }

  const contextValue: ProjectListContextProps = {
    createProject,
    deleteProject,
  };

  return (
    <ProjectListContext.Provider value={contextValue}>
      {children}
    </ProjectListContext.Provider>
  );
});
