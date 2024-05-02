// TODO: Search why this is not working. I had to put an import at globals.sccs for the font to work
import { Roboto } from 'next/font/google'

import { Metadata } from 'next'

import { ClerkProvider } from '@clerk/nextjs'
import './globals.scss'
// import themeOptions from './style/theme/theme'
import themeTwo from './style/theme/themeTwo'

import dynamic from 'next/dynamic'
import { PHProvider } from './providers'
import { ThemeProvider } from '@mui/material'

// const [currentTheme, setCurrentTheme] = useState(themeOptions)

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700', '900'],
})

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
})

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: {
    template: '%s | Duckling',
    default: 'Duckling',
  },
  description:
    'Duckling Sales Platform: To sign up for a demo email john@getduckling.com',
  applicationName: 'Duckling Sales Platform',
  authors: [
    {
      url: 'https://getduckling.com',
      name: 'Duckling',
    },
  ],
  keywords: [
    'Duckling',
    'Sales',
    'Platform',
    'Home Electrification',
    'Contractor SaaS',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={roboto.className}>
        <PHProvider>
          <ThemeProvider theme={themeTwo}>
            <body>
              <PostHogPageView />
              {children}
            </body>
          </ThemeProvider>
        </PHProvider>
      </html>
    </ClerkProvider>
  )
}
