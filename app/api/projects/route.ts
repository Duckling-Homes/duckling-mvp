import withErrorHandler from "@/app/utils/withErrorHandler";
import { createProject, getProjects } from "./repository";
import { NextRequest, NextResponse } from "next/server";

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

export const GET = withErrorHandler(async () => {
  return NextResponse.json(await getProjects());
});