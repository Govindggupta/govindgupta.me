"use client"

import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef } from "react"

const STORAGE_PREFIX = "scroll-position:"

function buildRouteKey(pathname: string) {
  return pathname
}

function getStorageKey(routeKey: string) {
  return `${STORAGE_PREFIX}${routeKey}`
}

function saveScrollPosition(routeKey: string) {
  sessionStorage.setItem(getStorageKey(routeKey), String(window.scrollY))
}

function readScrollPosition(routeKey: string) {
  const value = sessionStorage.getItem(getStorageKey(routeKey))
  if (!value) {
    return null
  }

  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : null
}

export function ScrollRestoration() {
  const pathname = usePathname()
  const routeKey = useMemo(() => buildRouteKey(pathname), [pathname])

  const previousRouteKeyRef = useRef<string | null>(null)
  const isPopNavigationRef = useRef(false)

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"

    const handlePopState = () => {
      isPopNavigationRef.current = true
    }

    const handlePageHide = () => {
      saveScrollPosition(routeKey)
    }

    window.addEventListener("popstate", handlePopState)
    window.addEventListener("pagehide", handlePageHide)

    return () => {
      window.removeEventListener("popstate", handlePopState)
      window.removeEventListener("pagehide", handlePageHide)
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [routeKey])

  useEffect(() => {
    const previousRouteKey = previousRouteKeyRef.current

    if (previousRouteKey && previousRouteKey !== routeKey) {
      saveScrollPosition(previousRouteKey)
    }

    if (isPopNavigationRef.current) {
      const savedScrollY = readScrollPosition(routeKey)
      if (savedScrollY !== null) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: savedScrollY, left: 0, behavior: "auto" })
          requestAnimationFrame(() => {
            window.scrollTo({ top: savedScrollY, left: 0, behavior: "auto" })
          })
        })
      }
    }

    isPopNavigationRef.current = false
    previousRouteKeyRef.current = routeKey
  }, [routeKey])

  return null
}
