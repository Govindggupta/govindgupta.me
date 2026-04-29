"use client"

import { useEffect, useState } from "react"
import type { ReactNode } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import Hamburger from "./Hamburger"
import { MobileNav } from "./MobileNav"
import { Logo } from "@/components/ui/Logo"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import VerticalBar from "../ui/VerticalBar"

const NAV_CLICK_SOUND_SRC = "/sound/nav-click.wav"

let navAudioContext: AudioContext | null = null
let navClickBuffer: AudioBuffer | null = null

async function initNavAudioBuffer() {
  if (navClickBuffer) return

  navAudioContext = new AudioContext()
  const response = await fetch(NAV_CLICK_SOUND_SRC)
  const arrayBuffer = await response.arrayBuffer()
  navClickBuffer = await navAudioContext.decodeAudioData(arrayBuffer)
}

function playNavClickSound() {
  if (!navAudioContext || !navClickBuffer) return

  const source = navAudioContext.createBufferSource()
  source.buffer = navClickBuffer
  source.connect(navAudioContext.destination)
  source.start(0)
}

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

  useEffect(() => {
    initNavAudioBuffer()
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
        playNavClickSound()
      }

      return nextOpen
    })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-2">
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
