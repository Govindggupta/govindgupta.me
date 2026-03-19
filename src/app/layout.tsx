import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import type { ReactNode } from "react"

import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { baseMetadata } from "@/lib/metadata"
import { cascadiaCode } from "./fonts"

import "./globals.css"
import { ThemeProvider } from "../../providers/ThemeProvider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  ...baseMetadata,
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="bg-background text-foreground transition-colors duration-300"
    >
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${cascadiaCode.variable} min-h-screen bg-background font-sans text-foreground antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col bg-background transition-colors duration-300">
            <Navbar />
            <main className="mx-auto w-full max-w-[900px] flex-1 pt-[4.5rem]">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
