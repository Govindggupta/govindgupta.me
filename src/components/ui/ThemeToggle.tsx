"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import KeyboardKey from "./KeyboardKey"
import { Tooltip } from "./Tooltip"

const sunRays = [
  { x1: 12, y1: 2.25, x2: 12, y2: 3.75 },
  { x1: 17.83, y1: 6.17, x2: 18.89, y2: 5.11 },
  { x1: 21.75, y1: 12, x2: 20.25, y2: 12 },
  { x1: 17.83, y1: 17.83, x2: 18.89, y2: 18.89 },
  { x1: 12, y1: 20.25, x2: 12, y2: 21.75 },
  { x1: 6.17, y1: 17.83, x2: 5.11, y2: 18.89 },
  { x1: 3.75, y1: 12, x2: 2.25, y2: 12 },
  { x1: 6.17, y1: 6.17, x2: 5.11, y2: 5.11 },
] as const

const CLICK_SOUND_SRC = "/sound/click_20.wav"

let audioContext: AudioContext | null = null
let clickBuffer: AudioBuffer | null = null

async function initAudioBuffer() {
  if (clickBuffer) return

  audioContext = new AudioContext()
  const response = await fetch(CLICK_SOUND_SRC)
  const arrayBuffer = await response.arrayBuffer()
  clickBuffer = await audioContext.decodeAudioData(arrayBuffer)
}

function playClickSound() {
  if (!audioContext || !clickBuffer) return

  const source = audioContext.createBufferSource()
  source.buffer = clickBuffer
  source.connect(audioContext.destination)
  source.start(0)
}

function SunIcon({ hovered, active }: { hovered: boolean; active: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
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
      className="text-black dark:text-white"
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

function MoonIcon({ hovered, active }: { hovered: boolean; active: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
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

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    Boolean(target.closest("input, textarea, select, [role='textbox']"))
  )
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [hovered, setHovered] = useState(false)
  const [tooltipDismissed, setTooltipDismissed] = useState(false)
  const [activeAnimation, setActiveAnimation] = useState<"sun" | "moon" | null>(
    null
  )
  const resetTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    initAudioBuffer()
  }, [])

  const isDark = resolvedTheme === "dark"
  const isTooltipVisible = hovered && !tooltipDismissed
  const clearTooltip = useCallback(() => {
    setHovered(false)
    setTooltipDismissed(false)
  }, [])

  const handleToggle = useCallback(() => {
    const nextTheme = isDark ? "light" : "dark"
    const nextAnimation = nextTheme === "dark" ? "moon" : "sun"

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current)
    }

    setActiveAnimation(nextAnimation)
    setTooltipDismissed(true)
    playClickSound()
    setTheme(nextTheme)

    resetTimeoutRef.current = window.setTimeout(() => {
      setActiveAnimation(null)
    }, 1150)
  }, [isDark, setTheme])

  useEffect(() => {
    function handleThemeShortcut(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return
      }

      if (event.code !== "KeyD" || isEditableTarget(event.target)) {
        return
      }

      event.preventDefault()
      handleToggle()
    }

    document.addEventListener("keydown", handleThemeShortcut)

    return () => {
      document.removeEventListener("keydown", handleThemeShortcut)
    }
  }, [handleToggle])

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        clearTooltip()
      }
    }

    window.addEventListener("blur", clearTooltip)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("blur", clearTooltip)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [clearTooltip])

  return (
    <div className="group relative">
      <motion.button
        type="button"
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        onClick={handleToggle}
        onHoverStart={() => {
          setTooltipDismissed(false)
          setHovered(true)
        }}
        onHoverEnd={clearTooltip}
        whileTap={{ scale: 0.96 }}
        className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl bg-transparent text-foreground transition-colors duration-200 ease-out hover:bg-background-alt focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none dark:hover:bg-white/10"
      >
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 hidden items-center justify-center dark:flex"
          initial={false}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <MoonIcon
            hovered={hovered}
            active={activeAnimation === "moon"}
          />
        </motion.span>

        <motion.span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center dark:hidden"
          initial={false}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <SunIcon
            hovered={hovered}
            active={activeAnimation === "sun"}
          />
        </motion.span>
      </motion.button>

      <Tooltip
        side="bottom"
        className={`${
          tooltipDismissed
            ? "invisible opacity-0 transition-none"
            : isTooltipVisible
              ? "visible opacity-100 transition-opacity duration-150"
              : "invisible opacity-0 transition-opacity duration-100"
        }`}
        contentClassName="gap-2 px-3 py-2"
      >
        <span>Toggle Mode</span>
        <span className="dark:hidden">
          <KeyboardKey tone="dark" size="xs">D</KeyboardKey>
        </span>
        <span className="hidden dark:inline-flex">
          <KeyboardKey tone="light" size="xs">D</KeyboardKey>
        </span>
      </Tooltip>
    </div>
  )
}
