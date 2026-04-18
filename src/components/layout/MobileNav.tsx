"use client"

import { useEffect } from "react"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useUmami } from "@/hooks/use-umami"

export type MobileNavItem = {
  href: string
  label: string
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

type MobileNavProps = {
  isOpen: boolean
  pathname: string
  navigation: MobileNavItem[]
  onClose: () => void
}

export function MobileNav({
  isOpen,
  pathname,
  navigation,
  onClose,
}: MobileNavProps) {
  const { trackEvent } = useUmami()

  useEffect(() => {
    if (!isOpen) {
      return
    }

    trackEvent("mobile_nav_open", {
      path: pathname,
    })
  }, [isOpen, pathname, trackEvent])

  return (
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
            onClick={onClose}
          />

          <motion.nav
            id="mobile-navigation"
            className="fixed right-2 z-20 mx-auto mt-2 flex w-48 max-w-50 flex-col rounded-2xl border border-border dark:border-zinc-700/50 bg-background px-2 py-2 text-center shadow-[0_16px_34px_-14px_rgba(0,0,0,0.26)] ring-1 ring-black/6 backdrop-blur-sm md:hidden md:px-6 dark:bg-(--accent) dark:ring-0 dark:shadow-none"
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
                      ? "bg-(--accent) font-medium text-foreground dark:bg-zinc-700/50 dark:text-(--accent-foreground)"
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
  )
}