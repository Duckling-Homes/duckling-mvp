import { SignIn } from '@clerk/nextjs'

import { Metadata } from 'next'
import './style.scss'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function Page() {
  return (
    <div className="signIn">
      <SignIn />
    </div>
  )
}
