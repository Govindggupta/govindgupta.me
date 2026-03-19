"use client"

import { useEffect, useState } from "react"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div aria-hidden="true" className="h-8 w-8" />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-border bg-transparent text-foreground transition-colors duration-200 hover:bg-neutral-100 focus-visible:ring-1 focus-visible:ring-neutral-400 focus-visible:outline-none dark:hover:bg-neutral-800"
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        <Sun size={15} strokeWidth={1.8} />
      </span>

      <span
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          isDark ? "opacity-0" : "opacity-100"
        }`}
      >
        <Moon size={15} strokeWidth={1.8} />
      </span>
    </button>
  )
}
