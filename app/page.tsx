// though we don't need to do this, I think we're not going to accommodate server side components because of the offline nature of the product
"use client";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { useUser } from "@clerk/nextjs";
import { Project } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <Container>
        <Heading>You must be signed in to view this page</Heading>
      </Container>
    );
  }

  const [projects, setProject] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects/")
      .then((response) => response.json())
      .then((data) => setProject(data));
  }, []);

  return (
    <main>
      <Container>
        <div>
          <Heading>Project List</Heading>
          <Link href="/project/create">Create Project</Link>
        </div>
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
