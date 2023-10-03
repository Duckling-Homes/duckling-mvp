import { NextRequest, NextResponse } from "next/server";
import { createOrganization, getOrganizations } from "./repository";

/**
 * Create a project
 * example: curl -X POST http://localhost:3000/api/organizations -d '{"name":"Duckling Inc."}' -H "Content-Type: application/json"
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { name } = await req.json();

  return NextResponse.json(await createOrganization({ name }));
}

/**
 * Get all projects
 * exmaple: curl http://localhost:3000/api/organizations
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(await getOrganizations());
}
