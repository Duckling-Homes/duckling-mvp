import { SignUp } from '@clerk/nextjs'

import { Metadata } from 'next'
import './style.scss'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function Page() {
  return (
    <div className="signUp">
      <SignUp />
    </div>
  )
}
