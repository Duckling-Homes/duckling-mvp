import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware

export default authMiddleware({
  publicRoutes: [
    '/presentation/:orgId/projects/:id',
    '/api/presentation/:orgId/projects/:projectId',
    '/api/presentation/:orgId/projects/:projectId/images/:imageId',
  ],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterAuth(auth, req: NextRequest, evt) {
    if (req.nextUrl.pathname.startsWith('/api/export')) {
      return // don't do anything for the export route
    }

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }

    if (req.nextUrl.pathname.startsWith('/api/assign')) {
      return // don't do anything for the assign route
    }

    if (
      req.nextUrl.pathname.startsWith('/api') &&
      !req.nextUrl.pathname.startsWith('/api/presentation')
    ) {
      // if this is an api route, add this header so our back end can tenantize its apis
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((auth.sessionClaims?.metadata as any)?.organization_id) {
        req.headers.set(
          'organization-context',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (auth.sessionClaims?.metadata as any)?.organization_id
        )
      } else {
        return NextResponse.json(
          {
            success: false,
            message: 'User does not have organization_id in Auth metadata',
          },
          { status: 401 }
        )
      }
    }
  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
