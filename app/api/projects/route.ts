import { createProject, getProjects } from "./repository";
import { NextRequest, NextResponse } from "next/server";

/**
 * Create a project
 * example: curl -X POST http://localhost:3000/api/projects -d '{"name":"Renovation Seattle", "homeownerName":"Rahul Patni", "homeownerPhone":"123-231-1233", "homeownerEmail":"asdf@asdf.com"}' -H "Content-Type: application/json"
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const {
    name,
    homeownerName,
    homeownerPhone,
    homeownerEmail,
    homeownerAddress,
    organizationId,
  } = await req.json();

  return NextResponse.json(
    await createProject({
      name,
      homeownerName,
      homeownerPhone,
      homeownerEmail,
      homeownerAddress,
      organizationId,
    }),
  );
}

/**
 * Get all projects
 * exmaple: curl http://localhost:3000/api/projects
 * example: curl "http://localhost:3000/api/projects?organizationId=ORG-ID"
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams
  const organizationId = searchParams.get('organizationId')

  return NextResponse.json(await getProjects(organizationId ? { organizationId } : {}));
}
