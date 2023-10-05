import withErrorHandler from "@/app/utils/withErrorHandler";
import { createProject, getProjects } from "./repository";
import { NextRequest, NextResponse } from "next/server";



/**
 * Create a project
 * example: curl -X POST http://localhost:3000/api/projects -d '{"name":"Renovation Seattle", "homeownerName":"Rahul Patni", "homeownerPhone":"123-231-1233", "homeownerEmail":"asdf@asdf.com"}' -H "Content-Type: application/json"
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
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
});

/**
 * Get all projects
 * exmaple: curl http://localhost:3000/api/projects
 */
export const GET = withErrorHandler(async () => {
  return NextResponse.json(await getProjects());
});