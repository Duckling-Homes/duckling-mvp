import { ensureUserExists } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const user = await ensureUserExists(req);
  return NextResponse.json(user);
}
