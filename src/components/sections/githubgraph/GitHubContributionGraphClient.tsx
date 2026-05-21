"use client"

import { animate, motion, useMotionValue } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const SQUARE_SIZE = 10
const SQUARE_GAP = 3
const COLUMN_WIDTH = SQUARE_SIZE + SQUARE_GAP
const ROW_HEIGHT = SQUARE_SIZE + SQUARE_GAP
const MONTH_LABEL_HEIGHT = 22
const GRAPH_WIDTH = 673
const GRAPH_HEIGHT = 120
const HEAT_COLORS = [
  "var(--heat-0)",
  "var(--heat-1)",
  "var(--heat-2)",
  "var(--heat-3)",
  "var(--heat-4)",
] as const

type GitHubContributionDay = {
  date: string
  contributionCount: number
  contributionLevel: 0 | 1 | 2 | 3 | 4
}

type GitHubContributionWeek = {
  contributionDays: GitHubContributionDay[]
}

type HoveredContribution = {
  date: string
  contributionCount: number
  leftPercent: number
  topPercent: number
}

function parseContributionDate(date: string) {
  return new Date(`${date}T00:00:00Z`)
}

function formatContributionDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(parseContributionDate(date))
    .replaceAll("/", ".")
}

function formatContributionTooltip(date: string, contributionCount: number) {
  return `${contributionCount} contribution${contributionCount === 1 ? "" : "s"} on ${formatContributionDate(date)}`
}

function getMonthLabels(weeks: GitHubContributionWeek[]) {
  const monthFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
  })
  const labels: Array<{ label: string; x: number }> = []
  const firstVisibleDay = weeks[0]?.contributionDays[0]

  if (firstVisibleDay) {
    const parsedFirstVisibleDay = parseContributionDate(firstVisibleDay.date)

    if (parsedFirstVisibleDay.getUTCDate() === 1) {
      const label = monthFormatter.format(parsedFirstVisibleDay)

      labels.push({
        label,
        x: 0,
      })
    }
  }

  weeks.forEach((week, weekIndex) => {
    if (weekIndex === 0) {
      return
    }

    const monthStartDay = week.contributionDays.find((day) => {
      const parsedDate = parseContributionDate(day.date)
      return parsedDate.getUTCDate() === 1
    })

    if (!monthStartDay) {
      return
    }

    const label = monthFormatter.format(parseContributionDate(monthStartDay.date))

    labels.push({
      label,
      x: Math.max(
        0,
        Math.min(weekIndex * COLUMN_WIDTH, GRAPH_WIDTH - label.length * 8)
      ),
    })
  })

  return labels
}

function getContributionFill(contributionLevel: number) {
  return HEAT_COLORS[contributionLevel] ?? HEAT_COLORS[0]
}

const DIGIT_STRIP = Array.from({ length: 30 }, (_, i) => i % 10)
const ITEM_HEIGHT = 14

function DigitWheel({ digit: targetDigit, direction = 0 }: { digit: number; direction?: 0 | 1 | -1 }) {
  const y = useMotionValue(-(10 + targetDigit) * ITEM_HEIGHT)

  useEffect(() => {
    const currentY = y.get()
    const currentIndex = Math.round(currentY / -ITEM_HEIGHT)
    const currentDigit = ((currentIndex % 10) + 10) % 10

    if (currentDigit === targetDigit) return

    let diff: number
    if (direction === 1) {
      diff = targetDigit - currentDigit
      if (diff <= 0) diff += 10
    } else if (direction === -1) {
      diff = targetDigit - currentDigit
      if (diff >= 0) diff -= 10
    } else {
      diff = targetDigit - currentDigit
      if (diff > 5) diff -= 10
      if (diff < -5) diff += 10
    }

    const targetIndex = currentIndex + diff
    const targetY = -targetIndex * ITEM_HEIGHT

    const controls = animate(y, targetY, {
      type: "spring",
      stiffness: 170,
      damping: 22,
      mass: 0.5,
    })
    return () => controls.stop()
  }, [targetDigit, direction, y])

  return (
    <span className="relative inline-block overflow-hidden text-center" style={{ width: "1ch", height: ITEM_HEIGHT }}>
      <motion.span
        className="absolute inset-x-0 flex flex-col items-center"
        style={{ y, willChange: "transform" }}
      >
        {DIGIT_STRIP.map((d, i) => (
          <span key={i} style={{ lineHeight: `${ITEM_HEIGHT}px`, height: ITEM_HEIGHT }}>
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

function AnimatedCounter({ value, minDigits = 1, direction = 0 }: { value: number; minDigits?: number; direction?: 0 | 1 | -1 }) {
  const str = String(value).padStart(minDigits, "0")

  return (
    <span className="inline-flex leading-none tabular-nums" aria-hidden="true">
      {str.split("").map((char, i) => (
        <DigitWheel key={str.length - 1 - i} digit={Number(char)} direction={direction} />
      ))}
    </span>
  )
}

function AnimatedDate({ date }: { date: string }) {
  const d = parseContributionDate(date)
  const day = d.getUTCDate()
  const month = d.getUTCMonth() + 1
  const year = d.getUTCFullYear()

  return (
    <span className="inline-flex leading-none tabular-nums">
      <AnimatedCounter value={day} minDigits={2} />
      <span>.</span>
      <AnimatedCounter value={month} minDigits={2} />
      <span>.</span>
      <AnimatedCounter value={year} minDigits={4} />
    </span>
  )
}

function getCurrentMonthX(weeks: GitHubContributionWeek[]) {
  const now = new Date()
  const currentMonth = now.getUTCMonth()
  const currentYear = now.getUTCFullYear()

  const currentMonthDayIndices: number[] = []

  weeks.forEach((week, weekIndex) => {
    week.contributionDays.forEach((day) => {
      const parsedDate = parseContributionDate(day.date)

      if (
        parsedDate.getUTCMonth() === currentMonth &&
        parsedDate.getUTCFullYear() === currentYear
      ) {
        currentMonthDayIndices.push(weekIndex)
      }
    })
  })

  if (currentMonthDayIndices.length === 0) {
    return null
  }

  const firstVisibleWeekIndex = Math.min(...currentMonthDayIndices)
  return firstVisibleWeekIndex * COLUMN_WIDTH
}

export function GitHubContributionGraphClient({
  weeks,
  totalContributions,
}: Readonly<{
  weeks: GitHubContributionWeek[]
  totalContributions: number
}>) {
  const graphScrollContainerRef = useRef<HTMLDivElement | null>(null)
  const [activeContribution, setActiveContribution] =
    useState<HoveredContribution | null>(null)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const lastContributionRef = useRef<HoveredContribution | null>(null)
  const prevActiveRef = useRef<HoveredContribution | null>(null)

  let direction: 0 | 1 | -1 = 0
  if (activeContribution && prevActiveRef.current && activeContribution.date !== prevActiveRef.current.date) {
    direction = activeContribution.contributionCount > prevActiveRef.current.contributionCount ? 1 : -1
  }
  if (activeContribution) {
    prevActiveRef.current = activeContribution
  }

  const monthLabels = getMonthLabels(weeks)
  const formattedTotalContributions = new Intl.NumberFormat("en-US").format(
    totalContributions
  )

  useEffect(() => {
    if (isTooltipVisible) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setActiveContribution(null)
    }, 100)

    return () => window.clearTimeout(timeoutId)
  }, [isTooltipVisible])

  useEffect(() => {
    const graphScrollContainer = graphScrollContainerRef.current

    if (!graphScrollContainer) {
      return
    }

    if (!window.matchMedia("(max-width: 639px)").matches) {
      return
    }

    if (graphScrollContainer.scrollWidth <= graphScrollContainer.clientWidth) {
      return
    }

    const currentMonthX = getCurrentMonthX(weeks)

    if (currentMonthX === null) {
      return
    }

    const desiredScrollLeft = Math.max(
      0,
      currentMonthX - graphScrollContainer.clientWidth * 0.35
    )

    graphScrollContainer.scrollLeft = desiredScrollLeft
  }, [weeks])

  const displayContribution = activeContribution ?? lastContributionRef.current

  function showTooltip(contribution: HoveredContribution) {
    lastContributionRef.current = contribution
    setActiveContribution(contribution)
    setIsTooltipVisible(true)
  }

  function hideTooltip() {
    setIsTooltipVisible(false)
  }

  return (
    <div className="space-y-6">
      <div
        ref={graphScrollContainerRef}
        className="w-full overflow-x-auto overflow-y-visible pb-2 [scrollbar-width:thin] sm:overflow-visible sm:pb-0"
      >
        <div
          className="relative isolate z-0 w-168.25 overflow-visible sm:w-full"
          onPointerLeave={hideTooltip}
        >
          <div
            role="tooltip"
            className={[
              "pointer-events-none absolute z-50 w-max -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-xl border border-transparent bg-foreground px-3 py-2 text-sm leading-none text-background shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-opacity duration-100 ease-out dark:shadow-[0_10px_30px_rgba(255,255,255,0.14)]",
              isTooltipVisible ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{
              left: `${displayContribution?.leftPercent ?? 50}%`,
              top: `calc(${displayContribution?.topPercent ?? 50}% - 10px)`,
            }}
          >
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rotate-45 bg-foreground"
            />
            {displayContribution ? (
              <>
                <AnimatedCounter value={displayContribution.contributionCount} direction={direction} />
                <span>
                  {" "}contribution
                  {displayContribution.contributionCount === 1 ? "" : "s"} on{" "}
                </span>
                <AnimatedDate date={displayContribution.date} />
              </>
            ) : null}
          </div>

          <svg
            viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
            preserveAspectRatio="xMinYMid meet"
            className="block h-auto w-full"
            role="img"
            aria-label="GitHub contribution graph"
          >
            {monthLabels.map((month) => (
              <text
                key={`${month.label}-${month.x}`}
                x={month.x}
                y={12}
                fill="var(--muted)"
                fontFamily="var(--font-cascadia), ui-monospace, monospace"
                fontSize="10"
                letterSpacing="0.08em"
              >
                {month.label}
              </text>
            ))}

            {weeks.map((week, weekIndex) =>
              week.contributionDays.map((day, dayIndex) => {
                const x = weekIndex * COLUMN_WIDTH
                const y = MONTH_LABEL_HEIGHT + dayIndex * ROW_HEIGHT

                return (
                  <rect
                    key={day.date}
                    x={x}
                    y={y}
                    width={SQUARE_SIZE}
                    height={SQUARE_SIZE}
                    rx="2"
                    fill={getContributionFill(day.contributionLevel)}
                    tabIndex={0}
                    aria-label={formatContributionTooltip(
                      day.date,
                      day.contributionCount
                    )}
                    className="cursor-default"
                    onPointerEnter={() =>
                      showTooltip({
                        date: day.date,
                        contributionCount: day.contributionCount,
                        leftPercent: ((x + SQUARE_SIZE / 2) / GRAPH_WIDTH) * 100,
                        topPercent: (y / GRAPH_HEIGHT) * 100,
                      })
                    }
                    onFocus={() =>
                      showTooltip({
                        date: day.date,
                        contributionCount: day.contributionCount,
                        leftPercent: ((x + SQUARE_SIZE / 2) / GRAPH_WIDTH) * 100,
                        topPercent: (y / GRAPH_HEIGHT) * 100,
                      })
                    }
                    onBlur={hideTooltip}
                  />
                )
              })
            )}
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 text-[10px] text-muted sm:text-[11px]">
        <span className="whitespace-nowrap text-[11px] text-foreground-soft sm:text-xs">
          {formattedTotalContributions} contributions in the last year
        </span>
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span>Less</span>
          <div className="flex items-center gap-0.75">
            {HEAT_COLORS.map((color, index) => (
              <span
                key={`legend-${index}`}
                className="h-2.5 w-2.5 rounded-xs"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
