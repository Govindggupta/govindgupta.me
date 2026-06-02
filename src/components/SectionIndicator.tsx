"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { HOME_SECTIONS } from "@/lib/home-sections"

const SECTIONS = [
  { id: HOME_SECTIONS.HERO, label: "Hero" },
  { id: HOME_SECTIONS.ABOUT, label: "About" },
  { id: HOME_SECTIONS.TECH_STACK, label: "Tech Stack" },
  //   { id: HOME_SECTIONS.EXPERIENCE, label: "Experience" },
  { id: HOME_SECTIONS.PROJECTS, label: "Projects" },
  { id: HOME_SECTIONS.BLOG, label: "Blog" },
  { id: HOME_SECTIONS.GITHUB, label: "GitHub" },
]

export function SectionIndicator() {
  const [activeSection, setActiveSection] = useState<string>(HOME_SECTIONS.HERO)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMouseInsideRef = useRef(false)
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Track which section is currently in view
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
          break
        }
      }
    }, observerOptions)

    // Observe all sections
    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  const handleMouseEnter = () => {
    isMouseInsideRef.current = true
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    isMouseInsideRef.current = false
    leaveTimerRef.current = setTimeout(() => {
      if (!isMouseInsideRef.current) setIsHovered(false)
    }, 150)
  }

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div
      ref={containerRef}
      className="fixed right-6 top-1/2 z-40 -translate-y-1/2 hidden lg:block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col gap-2.5">
        {SECTIONS.map(({ id }) => (
          <button
            key={id}
            onClick={() => handleSectionClick(id)}
            className={`w-6 h-0.5 rounded-full transition-all duration-300 ${activeSection === id
                ? "bg-foreground"
                : "bg-muted hover:bg-foreground/60"
              }`}
            title={SECTIONS.find((s) => s.id === id)?.label}
            aria-label={`Go to ${SECTIONS.find((s) => s.id === id)?.label}`}
          />
        ))}
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.nav
            key="expanded"
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-2xl border border-border dark:border-zinc-700/50 bg-background px-2 py-2 shadow-[0_16px_34px_-14px_rgba(0,0,0,0.26)] ring-1 ring-black/6 backdrop-blur-sm dark:bg-(--accent) dark:ring-0 dark:shadow-none min-w-[140px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex flex-col gap-0">
              {SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => handleSectionClick(id)}
                  className={`rounded-lg px-3 py-2 text-md tracking-[-0.02em] transition-colors duration-200 ${activeSection === id
                      ? "bg-(--accent) font-medium text-foreground dark:bg-zinc-700/50 dark:text-(--accent-foreground)"
                      : "text-muted hover:bg-(--accent-muted) hover:text-foreground"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}
