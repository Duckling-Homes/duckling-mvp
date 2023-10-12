import withErrorHandler from '@/app/utils/withErrorHandler'
import { clerkClient } from '@clerk/nextjs'
import { getAuth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withErrorHandler(async (req: NextRequest) => {
  console.log('hey ho')
  const { userId } = getAuth(req)

  if (!userId) return NextResponse.redirect('/sign-in')

  const user = await clerkClient.users.getUser(userId)

  const userIdToOrgId: { [key: string]: string } = {
    gmail: 'GoogleID',
    mail: 'MailID',
    user_3: 'org_3',
    user_4: 'org_4',
  }

  const emailDomain = user.emailAddresses[0].emailAddress.split('@')[1]

  if (!userId) return NextResponse.redirect('/sign-in')
  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      organization_id: userIdToOrgId[emailDomain] || 'publicOrg',
    },
  })

  // return a redirect to "/"
  return NextResponse.redirect('/')
})
