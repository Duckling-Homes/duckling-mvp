import withErrorHandler from '@/app/utils/withErrorHandler'
import { clerkClient } from '@clerk/nextjs'
import { getAuth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * This endpoint is called during sign in and sign up. It redirects to the home page.
 *
 * In the process below, it assigns a user to an organization. This route is not protected by authMiddleware org ID check.
 */
export const GET = withErrorHandler(async (req: NextRequest) => {
  const { userId } = getAuth(req)

  if (!userId) return NextResponse.redirect('/sign-in')

  const user = await clerkClient.users.getUser(userId)

  // const userIdToOrgId: { [key: string]: string } = {
  //   gmail: 'GoogleID',
  //   mail: 'MailID',
  //   user_3: 'org_3',
  //   user_4: 'org_4',
  // }

  // const emailDomain = user.emailAddresses[0].emailAddress.split('@')[1]

  // we can add additional validation here including not overriding the org if it's already set
  // we can further validate that the user is allowed to be in this org

  if (!userId) return NextResponse.redirect('/sign-in')
  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      organization_id: 'publicOrg',
    },
  })

  return NextResponse.redirect(new URL('/', req.url))
})
