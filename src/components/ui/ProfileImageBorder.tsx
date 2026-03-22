"use client"

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"

import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion"

type ProfileImageBorderProps = {
  children: ReactNode
  className?: string
  size?: number
}

const FULL_ROTATION = 360
const HOVER_DURATION = 1.5
const NORMAL_DURATION = 9
const SEGMENT_SWEEP = 90

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

function describeArc(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(centerX, centerY, radius, startAngle)
  const end = polarToCartesian(centerX, centerY, radius, endAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
}

function normalizeAngle(angle: number) {
  const normalized = angle % FULL_ROTATION

  return normalized < 0 ? normalized + FULL_ROTATION : normalized
}

export function ProfileImageBorder({
  children,
  className,
  size = 96,
}: ProfileImageBorderProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const rotation = useMotionValue(0)
  const animationRef = useRef<{ stop: () => void } | null>(null)
  const isMountedRef = useRef(false)
  const uniqueId = useId().replace(/:/g, "")

  const center = size / 2
  const radius = center - 1
  const segmentEndAngle = 270
  const segmentStartAngle = segmentEndAngle - SEGMENT_SWEEP
  const segmentEndPoint = polarToCartesian(center, center, radius, segmentEndAngle)
  const segmentStartPoint = polarToCartesian(
    center,
    center,
    radius,
    segmentStartAngle,
  )
  const segmentPath = describeArc(
    center,
    center,
    radius,
    segmentStartAngle,
    segmentEndAngle,
  )
  const wrapperStyle: CSSProperties | undefined = className
    ? undefined
    : { width: size, height: size }

  function stopAnimation() {
    animationRef.current?.stop()
    animationRef.current = null
  }

  function startRotation(duration: number) {
    if (prefersReducedMotion || !isMountedRef.current) {
      return
    }

    const startAngle = normalizeAngle(rotation.get())

    rotation.set(startAngle)
    stopAnimation()
    animationRef.current = animate(rotation, startAngle + FULL_ROTATION, {
      duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    })
  }

  function handleMouseEnter() {
    setIsHovered(true)
    startRotation(HOVER_DURATION)
  }

  function handleMouseLeave() {
    setIsHovered(false)
    startRotation(NORMAL_DURATION)
  }

  useEffect(() => {
    isMountedRef.current = true

    if (prefersReducedMotion) {
      stopAnimation()
      rotation.set(0)

      return () => {
        isMountedRef.current = false
        stopAnimation()
      }
    }

    const startAngle = normalizeAngle(rotation.get())

    rotation.set(startAngle)
    stopAnimation()
    animationRef.current = animate(rotation, startAngle + FULL_ROTATION, {
      duration: NORMAL_DURATION,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    })

    return () => {
      isMountedRef.current = false
      stopAnimation()
    }
  }, [prefersReducedMotion, rotation])

  return (
    <div
      className={[
        "relative shrink-0 text-neutral-900 dark:text-white",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={wrapperStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-full w-full rounded-full">{children}</div>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <filter
            id={`${uniqueId}-ring-glow`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="1.8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.12}
          strokeWidth="1"
          initial={false}
          animate={{ strokeOpacity: isHovered ? 0.22 : 0.12 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          filter={`url(#${uniqueId}-ring-glow)`}
          initial={false}
          animate={{ strokeOpacity: isHovered ? 0.82 : 0 }}
          transition={{ duration: isHovered ? 0.18 : 0.3, ease: "easeOut" }}
        />
      </svg>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ rotate: rotation }}
      >
        <svg
          className="overflow-visible"
          width="100%"
          height="100%"
          viewBox={`0 0 ${size} ${size}`}
        >
          <defs>
            <linearGradient
              id={`${uniqueId}-segment-gradient`}
              x1={segmentStartPoint.x}
              y1={segmentStartPoint.y}
              x2={segmentEndPoint.x}
              y2={segmentEndPoint.y}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="38%" stopColor="currentColor" stopOpacity="0.03" />
              <stop offset="76%" stopColor="currentColor" stopOpacity="0.2" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.88" />
            </linearGradient>

            <filter
              id={`${uniqueId}-segment-glow`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={segmentPath}
            fill="none"
            stroke={`url(#${uniqueId}-segment-gradient)`}
            strokeWidth={1.5}
            strokeLinecap="round"
            filter={`url(#${uniqueId}-segment-glow)`}
          />

          <path
            d={segmentPath}
            fill="none"
            stroke={`url(#${uniqueId}-segment-gradient)`}
            strokeWidth={1}
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  )
}
