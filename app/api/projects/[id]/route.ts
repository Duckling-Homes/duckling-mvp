import { deleteProject, getProject, updateProject } from "../repository";
import { NextRequest, NextResponse } from "next/server";

/**
 * Get project by id
 * exmaple: curl http://localhost:3000/api/projects/[id]
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return NextResponse.json(await getProject(params.id));
}

/**
 * Delete a project by id
 * exmaple: curl -X DELETE http://localhost:3000/api/projects/[id]
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return NextResponse.json(await deleteProject(params.id));
}

/**
 * Update a project
 * exmaple: curl -X PATCH http://localhost:3000/api/projects/[id] -d '{"name":"Renovation Seattle", "homeownerName":"Rahul Patni", "homeownerPhone":"123-231-1233", "homeownerEmail":"asdf@asdf.com"}' -H "Content-Type: application/json"
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const {
    name,
    homeownerName,
    homeownerPhone,
    homeownerEmail,
    homeownerAddress,
  } = await req.json();

  return NextResponse.json(
    await updateProject(params.id, {
      name,
      homeownerName,
      homeownerPhone,
      homeownerEmail,
      homeownerAddress,
    }),
  );
}
