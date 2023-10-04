'use client';
import React from "react";

import { ProjectListProvider } from "@/context/ProjectListContext";
import { ProjectProvider } from "@/context/ProjectContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProjectListProvider>
      <ProjectProvider>
        {children}
      </ProjectProvider>
    </ProjectListProvider>
  );
}