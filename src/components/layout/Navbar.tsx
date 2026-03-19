"use client"

import { useEffect, useState } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Logo } from "@/components/ui/Logo"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

const navigation = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
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
      <nav className="mx-auto w-full max-w-[900px] rounded-2xl border border-border bg-background/80 backdrop-blur-sm transition-colors duration-300">
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
                    className={`text-sm tracking-[-0.02em] transition-opacity duration-200 hover:opacity-60 ${
                      active
                        ? "font-medium text-foreground underline decoration-current underline-offset-4"
                        : "text-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <ThemeToggle />

            <button
              type="button"
              className="text-sm text-muted transition-opacity duration-200 hover:opacity-60 md:hidden"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsOpen((open) => !open)}
            >
              Menu
            </button>
          </div>
        </div>
      </nav>

      {isOpen ? (
        <nav
          id="mobile-navigation"
          className="mx-auto mt-2 flex w-full max-w-[900px] flex-col gap-3 rounded-2xl border border-border bg-background/95 px-4 py-4 backdrop-blur-sm md:hidden md:px-6"
        >
          {navigation.map((item) => {
            const active = isActivePath(pathname, item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-[-0.02em] ${
                  active
                    ? "font-medium text-foreground underline decoration-current underline-offset-4"
                    : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      ) : null}
    </header>
  )
}
