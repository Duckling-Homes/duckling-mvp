import { SignIn } from '@clerk/nextjs'

import './style.scss'

export default function Page() {
  return (
    <div className="signIn">
      <SignIn />
    </div>
  )
}
