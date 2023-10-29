// TODO: Change this to Roboto
import { Inter } from 'next/font/google'

import { Metadata } from 'next'

import { ClerkProvider } from '@clerk/nextjs'
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
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
