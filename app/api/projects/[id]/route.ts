import { ensureUserExists } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getProject, updateProject } from "../repository";

/**
 * Get project by id
 * exmaple: curl http://localhost:3000/api/projects/[id]
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const project = await getProject(params.id);
  if (!project) {
    return NextResponse.json(
      { message: `No project with id ${params.id} exists.` },
      { status: 404 }
    );
  }
  const user = await ensureUserExists(req);
  if (project.userId !== user.id) {
    return NextResponse.json(
      { message: `You are not authorized to perform this action` },
      { status: 401 }
    );
  }
  return NextResponse.json(project);
}

/**
 * Delete a project by id
 * exmaple: curl -X DELETE http://localhost:3000/api/projects/[id]
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const project = await getProject(params.id);
  if (!project) {
    return NextResponse.json(
      { message: `No project with id ${params.id} exists.` },
      { status: 404 }
    );
  }
  const user = await ensureUserExists(req);
  if (project.userId !== user.id) {
    return NextResponse.json(
      { message: `You are not authorized to perform this action` },
      { status: 401 }
    );
  }

  return NextResponse.json(project);
}

/**
 * Update a project
 * exmaple: curl -X PATCH http://localhost:3000/api/projects/[id] -d '{"name":"Renovation Seattle", "homeownerName":"Rahul Patni", "homeownerPhone":"123-231-1233", "homeownerEmail":"asdf@asdf.com"}' -H "Content-Type: application/json"
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const project = await getProject(params.id);
  if (!project) {
    return NextResponse.json(
      { message: `No project with id ${params.id} exists.` },
      { status: 404 }
    );
  }

  const user = await ensureUserExists(req);
  if (project.userId !== user.id) {
    return NextResponse.json(
      { message: `You are not authorized to perform this action` },
      { status: 401 }
    );
  }

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
    })
  );
}
