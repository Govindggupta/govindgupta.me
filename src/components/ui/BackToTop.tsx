"use client"

import { useEffect, useRef, useState } from "react"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useTheme } from "next-themes"
import { ArrowUpRight } from "lucide-react"

const SCROLL_THRESHOLD_MIN = 260
const SCROLL_THRESHOLD_RATIO = 0.45
const SCROLL_DIRECTION_DELTA = 6
const TOOLTIP_DELAY_MS = 1000

type ScrollState = {
  isScrollingUp: boolean
  isVisible: boolean
}

export function BackToTop() {
  const shouldReduceMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrollingUp: true,
    isVisible: false,
  })
  const frameRef = useRef<number | null>(null)
  const lastScrollYRef = useRef(0)
  const scrollStateRef = useRef(scrollState)
  const tooltipTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    scrollStateRef.current = scrollState
  }, [scrollState])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current !== null) {
        window.clearTimeout(tooltipTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    function updateScrollState() {
      const currentScrollY = window.scrollY
      const threshold = Math.max(
        window.innerHeight * SCROLL_THRESHOLD_RATIO,
        SCROLL_THRESHOLD_MIN
      )
      const delta = currentScrollY - lastScrollYRef.current
      const nextState: ScrollState = {
        isVisible: currentScrollY > threshold,
        isScrollingUp:
          delta <= -SCROLL_DIRECTION_DELTA
            ? true
            : delta >= SCROLL_DIRECTION_DELTA
              ? false
              : scrollStateRef.current.isScrollingUp,
      }

      lastScrollYRef.current = currentScrollY
      frameRef.current = null

      if (
        nextState.isVisible !== scrollStateRef.current.isVisible ||
        nextState.isScrollingUp !== scrollStateRef.current.isScrollingUp
      ) {
        scrollStateRef.current = nextState
        setScrollState(nextState)
      }
    }

    function queueUpdate() {
      if (frameRef.current !== null) {
        return
      }

      frameRef.current = window.requestAnimationFrame(updateScrollState)
    }

    lastScrollYRef.current = window.scrollY
    updateScrollState()

    window.addEventListener("scroll", queueUpdate, { passive: true })
    window.addEventListener("resize", queueUpdate)

    return () => {
      window.removeEventListener("scroll", queueUpdate)
      window.removeEventListener("resize", queueUpdate)

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (scrollState.isVisible) {
      return
    }

    if (tooltipTimeoutRef.current !== null) {
      window.clearTimeout(tooltipTimeoutRef.current)
      tooltipTimeoutRef.current = null
    }

    setIsTooltipVisible(false)
  }, [scrollState.isVisible])

  function clearTooltipTimer() {
    if (tooltipTimeoutRef.current === null) {
      return
    }

    window.clearTimeout(tooltipTimeoutRef.current)
    tooltipTimeoutRef.current = null
  }

  function showTooltipWithDelay() {
    clearTooltipTimer()

    tooltipTimeoutRef.current = window.setTimeout(() => {
      setIsTooltipVisible(true)
      tooltipTimeoutRef.current = null
    }, TOOLTIP_DELAY_MS)
  }

  function hideTooltip() {
    clearTooltipTimer()
    setIsTooltipVisible(false)
  }

  function handleClick() {
    hideTooltip()

    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    })
  }

  const backgroundColor = mounted
    ? resolvedTheme === "dark"
      ? "#333333"
      : "#e5e5e5"
    : "var(--border)"

  return (
    <AnimatePresence>
      {scrollState.isVisible ? (
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.9, y: 18 }
          }
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.92, y: 14 }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0.16 }
              : {
                  duration: 0.28,
                  ease: [0.16, 1, 0.3, 1],
                }
          }
          className="fixed sm:bottom-8 sm:right-8 bottom-2 right-2 z-50"
        >
          <div className="relative">
            <motion.button
              type="button"
              aria-label="Back to top"
              onClick={handleClick}
              onMouseEnter={showTooltipWithDelay}
              onMouseLeave={hideTooltip}
              onFocus={() => setIsTooltipVisible(true)}
              onBlur={hideTooltip}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
              style={{ backgroundColor }}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-[14px] text-foreground shadow-[0_18px_40px_-24px_rgba(0,0,0,0.65)] backdrop-blur-md transition-[opacity,box-shadow] duration-200 hover:shadow-[0_22px_50px_-26px_rgba(0,0,0,0.72)] focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 ${
                scrollState.isScrollingUp
                  ? "opacity-100"
                  : "opacity-50 hover:opacity-100"
              }`}
            >

                  <ArrowUpRight
                    size={17}
                    strokeWidth={2}
                    className="absolute -rotate-45 text-black transition-all duration-200 ease-out group-hover:-translate-y-5 group-hover:opacity-0 dark:text-white"
                  />
                  <ArrowUpRight
                    size={17}
                    strokeWidth={2}
                    className="absolute -rotate-45 translate-y-5 text-black opacity-0 transition-all duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100 dark:text-white"
                  />
                </motion.button>

            <span
              className={`pointer-events-none absolute bottom-full left-1/2 mb-3 hidden -translate-x-1/2 transition-opacity duration-150 sm:block ${
                isTooltipVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="relative block whitespace-nowrap rounded-xl bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg dark:bg-white dark:text-neutral-900">
                Back to top
                <span className="absolute top-full left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1 rotate-45 bg-neutral-900 dark:bg-white" />
              </span>
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
