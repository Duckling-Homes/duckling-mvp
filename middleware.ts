import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware

export default authMiddleware({
  afterAuth(auth, req: NextRequest, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (req.nextUrl.pathname.startsWith("/api")) {
      const orgContext = req.headers.get("organization-context");
      // TODO change this to include making sure the org matches the user org in the metadata
      if (orgContext === null || orgContext.trim() === "") {
        return NextResponse.json(
          { success: false, message: "Missing organization-context header" },
          { status: 401 }
        );
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
