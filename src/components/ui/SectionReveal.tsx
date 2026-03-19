"use client"

import type { ReactNode } from "react"
import { useRef } from "react"

import { motion, useInView, useReducedMotion } from "framer-motion"

interface SectionRevealProps {
  children: ReactNode
  className?: string
}

const revealEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function SectionReveal({
  children,
  className,
}: Readonly<SectionRevealProps>) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, {
    amount: 0.2,
    once: true,
  })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
      animate={
        shouldReduceMotion || isInView ? { opacity: 1, y: 0 } : undefined
      }
      transition={{ duration: 0.3, ease: revealEase }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
