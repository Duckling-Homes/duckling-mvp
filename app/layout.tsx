'use client';


// TODO: Change this to Roboto
import { Inter } from "next/font/google";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
        
import { Metadata } from "next";

import "./globals.scss";
// import ducklingTheme from "./style/theme/theme" // Here whenever we decide to move to our own theme

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </body>
    </html>
  );
}
