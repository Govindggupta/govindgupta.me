"use client"

import { useEffect, useRef, useState } from "react"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"

const sunRays = [
  { x1: 12, y1: 2.25, x2: 12, y2: 4.5 },
  { x1: 17.30, y1: 6.70, x2: 18.89, y2: 5.11 },
  { x1: 21.75, y1: 12, x2: 19.5, y2: 12 },
  { x1: 17.30, y1: 17.30, x2: 18.89, y2: 18.89 },
  { x1: 12, y1: 19.5, x2: 12, y2: 21.75 },
  { x1: 6.70, y1: 17.30, x2: 5.11, y2: 18.89 },
  { x1: 4.5, y1: 12, x2: 2.25, y2: 12 },
  { x1: 6.70, y1: 6.70, x2: 5.11, y2: 5.11 },
] as const;

function SunIcon({
  hovered,
  active,
}: {
  hovered: boolean
  active: boolean
}) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={false}
      animate={{
        rotate: active ? [0, 40, 0] : hovered ? 12 : 0,
        scale: active ? [0.88, 1.05, 1] : hovered ? 1.04 : 1,
      }}
      transition={{
        duration: active ? 0.95 : 0.22,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-neutral-700 dark:text-neutral-200"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="4.25"
        initial={false}
        animate={{
          scale: active ? [0.7, 1.08, 1] : 1,
        }}
        transition={{
          duration: active ? 0.7 : 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ originX: "12px", originY: "12px" }}
      />

      {sunRays.map((ray, index) => (
        <motion.line
          key={`${ray.x1}-${ray.y1}`}
          {...ray}
          initial={false}
          animate={{
            opacity: active ? [0, 1, 1] : hovered ? 1 : 0.9,
            pathLength: active ? [0.15, 1, 1] : 1,
          }}
          transition={{
            duration: active ? 0.34 : 0.2,
            delay: active ? index * 0.07 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ originX: "12px", originY: "12px" }}
        />
      ))}
    </motion.svg>
  )
}

function MoonIcon({
  hovered,
  active,
}: {
  hovered: boolean
  active: boolean
}) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={false}
      animate={{
        rotate: active ? [0, -16, 14, -10, 6, -3, 0] : hovered ? -10 : 0,
        scale: active ? [0.9, 1.04, 1] : hovered ? 1.03 : 1,
      }}
      transition={{
        duration: active ? 0.95 : 0.22,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-neutral-700 dark:text-neutral-200"
    >
      <motion.path
        d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
        initial={false}
        animate={{
          pathLength: active ? [0.82, 1, 1] : 1,
        }}
        transition={{
          duration: active ? 0.55 : 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </motion.svg>
  )
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [activeAnimation, setActiveAnimation] = useState<"sun" | "moon" | null>(
    null
  )
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const resetTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    setMounted(true)
    audioRef.current = new Audio("/click.mp3")
    audioRef.current.volume = 0.5
    audioRef.current.preload = "auto"

    return () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current)
      }

      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  if (!mounted) {
    return <div aria-hidden="true" className="h-9 w-9" />
  }

  const isDark = resolvedTheme === "dark"

  const handleToggle = () => {
    const nextTheme = isDark ? "light" : "dark"
    const nextAnimation = nextTheme === "dark" ? "moon" : "sun"

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current)
    }

    setActiveAnimation(nextAnimation)
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      void audioRef.current.play().catch(() => {})
    }
    setTheme(nextTheme)

    resetTimeoutRef.current = window.setTimeout(() => {
      setActiveAnimation(null)
    }, 1150)
  }

  return (
    <motion.button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={handleToggle}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.96 }}
      className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-background-alt/80 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_8px_rgba(0,0,0,0.08)] transition-colors duration-200 hover:bg-background-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_2px_10px_rgba(0,0,0,0.32)]"
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          opacity: isDark ? 1 : 0,
          scale: isDark ? 1 : 0.88,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <MoonIcon hovered={hovered && isDark} active={activeAnimation === "moon"} />
      </motion.span>

      <motion.span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          opacity: isDark ? 0 : 1,
          scale: isDark ? 0.88 : 1,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <SunIcon hovered={hovered && !isDark} active={activeAnimation === "sun"} />
      </motion.span>
    </motion.button>
  )
}
