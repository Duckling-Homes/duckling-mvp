import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
// create client
// curl command example: curl -X POST http://localhost:3000/api/project -d '{"name":"Renovation Seattle", "homeownerName":"Rahul Patni", "homeownerPhone":"123-231-1233", "homeownerEmail":"asdf@asdf.com"}' -H "Content-Type: application/json"
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { name, homeownerName, homeownerPhone, homeownerEmail } =
    await req.json();

  return NextResponse.json(
    await createProject({ name, homeownerName, homeownerPhone, homeownerEmail })
  );
}

export async function createProject(project: Prisma.ProjectCreateInput) {
  const client = await prisma.project.create({
    data: project,
  });

  return client;
}

// get all clients
// curl command example: curl http://localhost:3000/api/project
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(await getProjects());
}

export async function getProjects() {
  const clients = await prisma.project.findMany();

  return clients;
}
