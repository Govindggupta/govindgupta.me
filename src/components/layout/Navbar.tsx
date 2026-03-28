"use client"

import { useEffect, useState } from "react"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

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

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3">
      <nav className="mx-auto w-full max-w-[900px] rounded-2xl border border-border bg-background/80 backdrop-blur-sm">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          <Logo />

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-5 md:flex">
              {navigation.map((item) => {
                const active = isActivePath(pathname, item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium tracking-[-0.02em] transition-colors duration-200 ease-out hover:text-foreground ${
                      active
                        ? "text-foreground"
                        : "text-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <button
              type="button"
              className="text-sm text-muted transition-opacity duration-200 hover:opacity-60 md:hidden"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsOpen((open) => !open)}
            >
              Menu
            </button>
            <VerticalBar />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            id="mobile-navigation"
            className="fixed right-10 mx-auto mt-2 flex w-full max-w-[150px] flex-col rounded-2xl border border-border bg-background/95 px-2 py-2 text-center backdrop-blur-sm md:hidden md:px-6"
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
                  className={`rounded-lg px-3 py-1.5 text-sm tracking-[-0.02em] transition-colors duration-200 ${
                    active
                      ? "bg-background-alt/80 font-medium text-foreground"
                      : "text-muted hover:bg-background-alt/50 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
