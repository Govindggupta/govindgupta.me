"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import Hamburger from "./Hamburger"
import { MobileNav } from "./MobileNav"
import { Logo } from "@/components/ui/Logo"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import VerticalBar from "../ui/VerticalBar"

const navigation = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
]

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

type NavbarClientProps = {
  githubNavItem: ReactNode
}

export function NavbarClient({ githubNavItem }: NavbarClientProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const menuSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const menuSound = new Audio("/sound/nav-click.mp3")
    menuSound.preload = "auto"
    menuSoundRef.current = menuSound

    return () => {
      menuSound.pause()
      menuSoundRef.current = null
    }
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    const previousBodyTouchAction = document.body.style.touchAction

    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    document.body.style.touchAction = "none"

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
      document.body.style.touchAction = previousBodyTouchAction
    }
  }, [isOpen])

  function handleHamburgerClick() {
    setIsOpen((open) => {
      const nextOpen = !open

      if (nextOpen) {
        const menuSound = menuSoundRef.current
        if (menuSound) {
          menuSound.currentTime = 0
          void menuSound.play().catch(() => {
            // Ignore browser playback policy errors.
          })
        }
      }

      return nextOpen
    })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-3">
      <nav className="mx-auto w-full max-w-225 rounded-2xl border border-border bg-background/80 backdrop-blur-sm">
        <div className="flex h-14 items-center justify-between px-3 md:px-4">
          <Logo />

          <div className="flex items-center gap-1 md:gap-3">
            <div className="hidden items-center gap-5 md:flex">
              {navigation.map((item) => {
                const active = isActivePath(pathname, item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium tracking-[-0.02em] transition-colors duration-200 ease-out hover:text-foreground ${
                      active ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {githubNavItem}

            <div className="flex items-center gap-1 md:gap-3">
              <VerticalBar />

              <div className="flex items-center">
                <ThemeToggle />

                <div className="z-100 flex items-center md:hidden">
                  <Hamburger
                    isOpen={isOpen}
                    onClick={handleHamburgerClick}
                    ariaControls="mobile-navigation"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <MobileNav
        isOpen={isOpen}
        pathname={pathname}
        navigation={navigation}
        onClose={() => setIsOpen(false)}
      />
    </header>
  )
}
