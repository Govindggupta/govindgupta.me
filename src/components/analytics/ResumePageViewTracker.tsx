"use client"

import { useEffect } from "react"

import { useUmami } from "@/hooks/use-umami"

export function ResumePageViewTracker() {
  const { trackEvent } = useUmami()

  useEffect(() => {
    trackEvent("resume_page_view", {
      path: "/resume",
    })
  }, [trackEvent])

  return null
}