'use client';

import { ProjectProvider } from "@/context/ProjectsContext";


export function Providers({ children }) {
  return (
    <ProjectProvider>
      {children}
    </ProjectProvider>
  );
}