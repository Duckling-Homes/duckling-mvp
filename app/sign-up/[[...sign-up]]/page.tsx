import { SignUp } from '@clerk/nextjs'

import './style.scss'

export default function Page() {
  return (
    <div className="signUp">
      <SignUp />
    </div>
  )
}
