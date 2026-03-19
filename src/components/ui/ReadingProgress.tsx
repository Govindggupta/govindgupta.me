"use client"

import { useEffect, useState } from "react"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight

      if (scrollHeight <= 0) {
        setProgress(0)
        return
      }

      setProgress(Math.min(1, scrollTop / scrollHeight))
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5">
      <div
        className="h-full origin-left bg-neutral-900 transition-transform duration-100 dark:bg-neutral-100"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
