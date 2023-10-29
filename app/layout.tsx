// TODO: Change this to Roboto
import { Inter } from 'next/font/google'

import { Metadata } from 'next'

import { ClerkProvider } from '@clerk/nextjs'
import Head from 'next/head'
import './globals.scss'
// import ducklingTheme from "./style/theme/theme" // Here whenever we decide to move to our own theme

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: {
    template: '%s | Duckling',
    default: 'Duckling',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <title>Duckling Platform</title>
          <meta name="description" content="Duckling Platform." key="desc" />
        </Head>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
