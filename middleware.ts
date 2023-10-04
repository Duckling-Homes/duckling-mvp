import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// Configure the middleware to apply to paths starting with `/api/`
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

export function middleware(request: NextRequest): NextResponse | void {
  // Check for the existence and validity of the 'organization-context' header
  // For now, we simply check that it exists
  const orgContext = request.headers.get("organization-context");

  // TODO change this to include making sure the org matches the user org in the metadata
  if (orgContext === null || orgContext.trim() === "") {
    return NextResponse.json(
      { success: false, message: "Missing organization-context header" },
      { status: 401 }
    );
  }

  return;
}

export default authMiddleware({});
