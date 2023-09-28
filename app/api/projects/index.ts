import { NextApiRequest, NextApiResponse } from "next";
import { createProject, getProjects } from "./repository";
import { apiErrorHandler } from "@/app/utils/apiErrorHandler";

/**
 * Get all projects
 * exmaple: curl http://localhost:3000/api/projects
 */
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const projects = await getProjects();
  res.json(projects);
}

/**
 * Create a project
 * example: curl -X POST http://localhost:3000/api/projects -d '{"name":"Renovation Seattle", "homeownerName":"Rahul Patni", "homeownerPhone":"123-231-1233", "homeownerEmail":"asdf@asdf.com"}' -H "Content-Type: application/json"
 */
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const {
    name,
    homeownerName,
    homeownerPhone,
    homeownerEmail,
    homeownerAddress,
  } = req.body;
  const project = await createProject({
    name,
    homeownerName,
    homeownerPhone,
    homeownerEmail,
    homeownerAddress,
  });
  res.json(project);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        return GET(req, res);
      case "POST":
        return POST(req, res);
      default:
        res.setHeader("Allow", ["GET", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    apiErrorHandler(err as Error, res);
  }
};
