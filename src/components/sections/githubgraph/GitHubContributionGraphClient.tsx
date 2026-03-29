"use client"

import { useEffect, useState } from "react"

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

export function GitHubContributionGraphClient({
  weeks,
  totalContributions,
}: Readonly<{
  weeks: GitHubContributionWeek[]
  totalContributions: number
}>) {
  const [activeContribution, setActiveContribution] =
    useState<HoveredContribution | null>(null)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

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

  function showTooltip(contribution: HoveredContribution) {
    setActiveContribution(contribution)
    setIsTooltipVisible(true)
  }

  function hideTooltip() {
    setIsTooltipVisible(false)
  }

  return (
    <div className="space-y-6">
      <div
        className="relative isolate z-0 w-full overflow-visible"
        onPointerLeave={hideTooltip}
      >
        {activeContribution ? (
          <div
            role="tooltip"
            className={[
              "pointer-events-none absolute z-50 w-max -translate-x-1/2 translate-y-[-100%] whitespace-nowrap rounded-xl border border-transparent bg-foreground px-3 py-2 text-sm leading-none text-background shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-opacity duration-100 ease-out dark:shadow-[0_10px_30px_rgba(255,255,255,0.14)]",
              isTooltipVisible ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{
              left: `${activeContribution.leftPercent}%`,
              top: `calc(${activeContribution.topPercent}% - 10px)`,
            }}
          >
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rotate-45 bg-foreground"
            />
            {formatContributionTooltip(
              activeContribution.date,
              activeContribution.contributionCount
            )}
          </div>
        ) : null}

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

      <div className="flex items-center justify-between gap-3 text-[10px] text-muted sm:text-[11px]">
        <span className="whitespace-nowrap text-[11px] text-foreground-soft sm:text-xs">
          {formattedTotalContributions} contributions in the last year
        </span>
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span>Less</span>
          <div className="flex items-center gap-[3px]">
            {HEAT_COLORS.map((color, index) => (
              <span
                key={`legend-${index}`}
                className="h-2.5 w-2.5 rounded-[2px]"
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
