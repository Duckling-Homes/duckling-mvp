import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
