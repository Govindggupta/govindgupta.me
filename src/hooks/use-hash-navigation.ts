"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Hook to handle hash-based navigation with smooth scrolling to sections
 * Used primarily on the homepage to navigate between sections like #about, #projects, etc.
 */
export function useHashNavigation() {
  const pathname = usePathname()

  useEffect(() => {
    // Only handle hash navigation on the home page
    if (pathname !== "/") return

    // Get hash from URL
    const hash = window.location.hash.slice(1)

    if (!hash) return

    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 0)
  }, [pathname])

  // Handle hash changes when user clicks on anchor links
  useEffect(() => {
    const handleHashChange = () => {
      if (pathname !== "/") return

      const hash = window.location.hash.slice(1)

      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }, 0)
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [pathname])
}
