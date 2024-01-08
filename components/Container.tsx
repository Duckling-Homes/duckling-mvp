'use client'

import Header from './Header'

export const Container = (props: {
  publicRoute?: boolean
  orgName?: string
  children: React.ReactNode
}): JSX.Element => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#E8EAF6',
      }}
    >
      <Header publicRoute={props.publicRoute} orgName={props.orgName} />
      <div>{props.children}</div>
    </div>
  )
}
