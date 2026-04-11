import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import type { ReactNode } from "react"

import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { BackToTop } from "@/components/ui/BackToTop"
import { baseMetadata } from "@/lib/metadata"
import { cascadiaCode } from "./fonts"
import "./globals.css"
import { ThemeProvider } from "../../providers/ThemeProvider"
import { Analytics } from "@vercel/analytics/next"

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
      className="bg-background text-foreground"
    >
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${cascadiaCode.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <Analytics />
        <ThemeProvider>
          <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="mx-auto w-full max-w-[900px] flex-1 pt-[4.5rem]">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
