"use client"

import { useEffect, useState } from "react"
import type { ReactNode } from "react"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

import Hamburger from "./Hamburger"
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3">
      <nav className="mx-auto w-full max-w-225 rounded-2xl border border-border bg-background/80 backdrop-blur-sm">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
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

              <div className="flex items-center gap-0.5 md:gap-3">
                <ThemeToggle />

                <div className="z-100 flex items-center md:hidden">
                  <Hamburger
                    isOpen={isOpen}
                    onClick={() => setIsOpen((open) => !open)}
                    ariaControls="mobile-navigation"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close mobile navigation"
              className="fixed inset-0 z-10 cursor-default md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.nav
              id="mobile-navigation"
              className="fixed right-4 z-20 mx-auto mt-2 flex w-48 max-w-50 flex-col rounded-2xl border border-border bg-background px-2 py-2 text-center shadow-[0_16px_34px_-14px_rgba(0,0,0,0.26)] ring-1 ring-black/6 backdrop-blur-sm md:hidden md:px-6 dark:bg-(--accent) dark:ring-0 dark:shadow-none"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1 }}
            >
              {navigation.map((item) => {
                const active = isActivePath(pathname, item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg px-3 py-2 text-md tracking-[-0.02em] transition-colors duration-200 ${
                      active
                        ? "bg-(--accent) font-medium text-foreground dark:bg-white/10 dark:text-(--accent-foreground)"
                        : "text-muted hover:bg-(--accent-muted) hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
