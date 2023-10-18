import withErrorHandler from '@/app/utils/withErrorHandler'
import prisma from '@/lib/prisma'
import { clerkClient } from '@clerk/nextjs'
import { getAuth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

const createDemoOrgIfItDoesNotExist = async () => {
  const name = 'DEMO_ORGANIZATION'
  var org = await prisma.organization.findFirst({
    where: {
      name,
    },
  })

  if (!org) {
    org = await prisma.organization.create({
      data: {
        name,
      },
    })
  }

  return org
}

/**
 * This endpoint is called during sign in and sign up. It redirects to the home page.
 *
 * In the process below, it assigns a user to an organization.
 *
 * This route is not protected by authMiddleware org ID check.
 */
export const GET = withErrorHandler(async (req: NextRequest) => {
  const { userId } = getAuth(req)
  if (!userId) return NextResponse.redirect(new URL('/sign-in', req.url))

  const clerkUser = await clerkClient.users.getUser(userId)
  if (clerkUser.publicMetadata.organization_id) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // get the public org
  const demoOrg = await createDemoOrgIfItDoesNotExist()

  const userInDb = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  // if user is not in the database, create them and add them to the public org
  if (!userInDb) {
    const email = clerkUser.emailAddresses[0].emailAddress
    await prisma.user.create({
      data: {
        id: userId,
        email,
        firstName: clerkUser.firstName ?? '',
        lastName: clerkUser.lastName ?? '',
        organization: {
          connect: {
            id: demoOrg.id,
          },
        },
      },
    })

    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        organization_id: demoOrg.id,
      },
    })

    return NextResponse.redirect(new URL('/', req.url))
  }

  // if user is in the database, update the org id in clerk
  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      organization_id: clerkUser,
    },
  })

  return NextResponse.redirect(new URL('/', req.url))
})
