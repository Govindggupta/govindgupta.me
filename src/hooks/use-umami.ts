"use client"

import { useCallback } from "react"

type UmamiPayload = Record<
  string,
  string | number | boolean | null | undefined
>

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, data?: UmamiPayload) => void
    }
  }
}

export function useUmami() {
  const trackEvent = useCallback((eventName: string, data?: UmamiPayload) => {
    if (typeof window === "undefined" || !window.umami?.track) {
      return
    }

    try {
      window.umami.track(eventName, data)
    } catch {
      // Ignore analytics errors so user interactions are never blocked.
    }
  }, [])

  return { trackEvent }
}