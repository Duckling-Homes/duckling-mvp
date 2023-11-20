'use client'

import Header from './Header'

export const Container = (props: {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#E8EAF6'
      }}
    >
      <Header />
      <div style={{
        padding: '16px'
      }}>{props.children}</div>
    </div>
  )
}
