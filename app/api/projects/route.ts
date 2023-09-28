import { NextApiRequest, NextApiResponse } from "next";
import { createProject, getProjects } from "./repository";
import { apiErrorHandler } from "@/app/utils/apiErrorHandler";
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
  } = await req.json();

  return NextResponse.json(
    await createProject({
      name,
      homeownerName,
      homeownerPhone,
      homeownerEmail,
      homeownerAddress,
    }),
  );
}

/**
 * Get all projects
 * exmaple: curl http://localhost:3000/api/projects
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(await getProjects());
}
