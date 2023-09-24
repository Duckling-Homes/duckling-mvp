// though we don't need to do this, I think we're not going to accommodate server side components because of the offline nature of the product
"use client";

import { Container } from "@/components/Container";
import { Project } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [projects, setProject] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/project/")
      .then((response) => response.json())
      .then((data) => setProject(data));
  }, []);

  return (
    <main>
      <Container>
        <h1>Client List</h1>
        <a href="/project/create">Create Client</a>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Homeowner Name</th>
              <th>Homeowner Phone</th>
              <th>Homeowner Email</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.homeownerName}</td>
                <td>{project.homeownerPhone}</td>
                <td>{project.homeownerEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </main>
  );
}
