'use client';
import React from "react";

import { ProjectListProvider } from "@/context/ProjectListContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProjectListProvider>
      {children}
    </ProjectListProvider>
  );
}