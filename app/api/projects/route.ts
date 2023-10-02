import { ensureUserExists } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { createProject, getProjects } from "./repository";

/**
 * Create a project
 * example: curl -X POST http://localhost:3000/api/projects -d '{"name":"Renovation Seattle", "homeownerName":"Rahul Patni", "homeownerPhone":"123-231-1233", "homeownerEmail":"asdf@asdf.com"}' -H "Content-Type: application/json"
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const user = await ensureUserExists(req);

  const {
    name,
    homeownerName,
    homeownerPhone,
    homeownerEmail,
    homeownerAddress,
  } = await req.json();

  return NextResponse.json(
    await createProject({
      name,
      homeownerName,
      homeownerPhone,
      homeownerEmail,
      homeownerAddress,
      User: { connect: { id: user.id } },
    })
  );
}

/**
 * Get all projects
 * exmaple: curl http://localhost:3000/api/projects
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(await getProjects());
}