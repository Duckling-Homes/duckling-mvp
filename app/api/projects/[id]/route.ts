import { NextApiRequest, NextApiResponse } from "next";
import { apiErrorHandler } from "@/app/utils/apiErrorHandler";
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
export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const {
    name,
    homeownerName,
    homeownerPhone,
    homeownerEmail,
    homeownerAddress,
  } = req.body;

  const project = await updateProject(id as string, {
    name,
    homeownerName,
    homeownerPhone,
    homeownerEmail,
    homeownerAddress,
  });
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: "Project not found" });
  }
}
