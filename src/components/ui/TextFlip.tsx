"use client"

import { useEffect, useState } from "react"

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion"

interface TextFlipProps {
  texts: readonly string[]
  className?: string
  interval?: number
  transition?: Transition
  variants?: Variants
}

const defaultVariants: Variants = {
  initial: { y: -10, opacity: 0 },
  animate: { y: -1, opacity: 1 },
  exit: { y: 10, opacity: 0 },
}

const defaultTransition: Transition = {
  duration: 0.3,
  ease: "easeOut",
}

export function TextFlip({
  texts,
  className,
  interval = 1.5,
  transition = defaultTransition,
  variants = defaultVariants,
}: Readonly<TextFlipProps>) {
  const [index, setIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion || texts.length <= 1) {
      return
    }

    const timer = window.setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % texts.length)
    }, interval * 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [interval, shouldReduceMotion, texts.length])

  if (texts.length === 0) {
    return null
  }

  const activeText = texts[index] ?? texts[0]
  const classes = [
    "relative inline-flex min-h-[1lh] items-center overflow-hidden",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  if (shouldReduceMotion) {
    return (
      <span className={classes} aria-live="off">
        {texts[0]}
      </span>
    )
  }

  return (
    <span className={classes} aria-live="off">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={`${index}-${activeText}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={transition}
          className="inline-block"
        >
          {activeText}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
