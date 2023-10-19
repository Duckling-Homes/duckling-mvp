import withErrorHandler from '@/app/utils/withErrorHandler'
import prisma from '@/lib/prisma'
import { clerkClient } from '@clerk/nextjs'
import { getAuth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

// Function to create demo organization if it doesn't exist
const createDemoOrgIfItDoesNotExist = async () => {
  const uuid = "a4b5aa52-274d-4b1e-8f6b-3828f74c72d3";
  const name = "GreenEarth Initiatives";

  const existingOrganization = await prisma.organization.findUnique({
    where: {
      id: uuid
    }
  });

  if (existingOrganization) {
    console.log("Organization already exists.");
    return existingOrganization;
  }
  
  console.log("Creating Demo Org")
  return await prisma.organization.create({
    data: {
      id: uuid,
      name,
    },
  });
}

/**
 * This endpoint is called during sign in and sign up. It redirects to the home page.
 *
 * In the process below, it assigns a user to an organization.
 *
 * This route is not protected by authMiddleware org ID check.
 */
export const GET = withErrorHandler(async (req: NextRequest) => {
  const { userId } = getAuth(req);

  // Redirect if the user is not authenticated
  if (!userId) return NextResponse.redirect(new URL('/sign-in', req.url));

  // Get user from Clerk
  const clerkUser = await clerkClient.users.getUser(userId);
  const email = clerkUser.emailAddresses[0].emailAddress;

  // Look up the user in the local database
  const userInDb = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // Create or get demo organization
  const demoOrg = await createDemoOrgIfItDoesNotExist();

  // User exists in the local database
  if (userInDb) {
    // Check if organization ID is already in the public metadata
    if (clerkUser.publicMetadata.organization_id) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Update Clerk's user metadata with the organization ID
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        organization_id: userInDb.organizationId,
      },
    });
  } else {
    // User doesn't exist, so create them and add them to the demo organization
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
    });

    // Update Clerk's user metadata with the demo organization ID
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        organization_id: demoOrg.id,
      },
    });
  }

  return NextResponse.redirect(new URL('/', req.url));
});
