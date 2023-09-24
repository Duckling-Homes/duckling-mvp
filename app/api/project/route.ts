import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// create client
// curl command example: curl -X POST http://localhost:3000/api/project -d '{"name":"Renovation Seattle", "homeownerName":"Rahul Patni", "homeownerPhone":"123-231-1233", "homeownerEmail":"asdf@asdf.com"}' -H "Content-Type: application/json"
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { name, homeownerName, homeownerPhone, homeownerEmail } =
    await req.json();

  const client = await prisma.project.create({
    data: {
      name,
      homeownerName,
      homeownerPhone,
      homeownerEmail,
    },
  });

  return NextResponse.json(client);
}

// get all clients
// curl command example: curl http://localhost:3000/api/project
export async function GET(): Promise<NextResponse> {
  const clients = await prisma.project.findMany();

  return NextResponse.json(clients);
}
