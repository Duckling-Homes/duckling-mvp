import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware

export default authMiddleware({
  afterAuth(auth, req: NextRequest, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (req.nextUrl.pathname.startsWith("/api")) {
      // if this is an api route, add this header so our back end can tenantize its apis
      if ((auth.sessionClaims?.metadata as any)?.organization_id) {
        req.headers.set("organization-context", (auth.sessionClaims?.metadata as any)?.organization_id)
      } else {
          return NextResponse.json(
            { success: false, message: "User does not have organization_id in Auth metadata" },
            { status: 401 }
          );
      }      
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
