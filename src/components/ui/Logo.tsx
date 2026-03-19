"use client"

import { useEffect, useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"

import darkLogo from "@/logos/black_filled.svg"
import lightLogo from "@/logos/white_filled.svg"

export function Logo() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div aria-hidden="true" style={{ width: 104, height: 36 }} />
  }

  const logoSrc = resolvedTheme === "dark" ? lightLogo : darkLogo

  return (
    <Link
      href="/"
      className="inline-flex items-center transition-opacity duration-200 hover:opacity-60"
      aria-label="Go to homepage"
    >
      <Image
        src={logoSrc}
        alt="Govind Gupta"
        height={36}
        priority
        className="h-9 w-auto"
      />
    </Link>
  )
}
