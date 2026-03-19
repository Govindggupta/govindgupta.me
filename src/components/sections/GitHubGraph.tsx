import type { ReactNode } from "react"

import {
  githubProfileUrl,
  getGitHubContributionCalendar,
  type GitHubContributionWeek,
} from "@/lib/github"

const SQUARE_SIZE = 10
const SQUARE_GAP = 3
const COLUMN_WIDTH = SQUARE_SIZE + SQUARE_GAP
const ROW_HEIGHT = SQUARE_SIZE + SQUARE_GAP
const MONTH_LABEL_HEIGHT = 32
const GRAPH_WIDTH = 673
const GRAPH_HEIGHT = 120

function parseContributionDate(date: string) {
  return new Date(`${date}T00:00:00Z`)
}

function formatContributionTitle(date: string, contributionCount: number) {
  const dayLabel = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(parseContributionDate(date))

  return `${contributionCount} contribution${contributionCount === 1 ? "" : "s"} on ${dayLabel}`
}

function getContributionFill(contributionCount: number) {
  if (contributionCount === 0) {
    return "var(--heat-0)"
  }

  if (contributionCount <= 3) {
    return "var(--heat-1)"
  }

  if (contributionCount <= 6) {
    return "var(--heat-2)"
  }

  return "var(--heat-3)"
}

function getMonthLabels(weeks: GitHubContributionWeek[]) {
  const monthFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
  })

  return weeks.reduce<Array<{ label: string; x: number }>>(
    (labels, week, weekIndex) => {
      const firstDay = week.contributionDays[0]

      if (!firstDay) {
        return labels
      }

      const label = monthFormatter.format(parseContributionDate(firstDay.date))
      const previousLabel = labels.at(-1)?.label

      if (weekIndex === 0 || label !== previousLabel) {
        labels.push({
          label,
          x: weekIndex * COLUMN_WIDTH,
        })
      }

      return labels
    },
    []
  )
}

function ContributionGraphSvg({
  weeks,
}: Readonly<{
  weeks: GitHubContributionWeek[]
}>) {
  const monthLabels = getMonthLabels(weeks)

  return (
    <div className="w-full">
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
            y={10}
            fill="var(--muted)"
            fontFamily="var(--font-cascadia), ui-monospace, monospace"
            fontSize="10"
            letterSpacing="0.08em"
          >
            {month.label}
          </text>
        ))}

        {weeks.map((week, weekIndex) =>
          week.contributionDays.map((day, dayIndex) => (
            <rect
              key={day.date}
              x={weekIndex * COLUMN_WIDTH}
              y={MONTH_LABEL_HEIGHT + dayIndex * ROW_HEIGHT}
              width={SQUARE_SIZE}
              height={SQUARE_SIZE}
              rx="2"
              fill={getContributionFill(day.contributionCount)}
            >
              <title>
                {formatContributionTitle(day.date, day.contributionCount)}
              </title>
            </rect>
          ))
        )}
      </svg>
    </div>
  )
}

function GraphShell({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <section className="space-y-6 border-t border-border pt-10">
      <p className="text-xs tracking-widest text-muted uppercase">GitHub</p>

      {children}
    </section>
  )
}

export function GitHubGraphFallback() {
  return (
    <GraphShell>
      <div className="w-full animate-pulse space-y-4">
        <svg
          viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
          className="block h-auto w-full"
          aria-hidden="true"
        >
          {Array.from({ length: 52 }, (_, weekIndex) =>
            Array.from({ length: 7 }, (_, dayIndex) => (
              <rect
                key={`${weekIndex}-${dayIndex}`}
                x={weekIndex * COLUMN_WIDTH}
                y={MONTH_LABEL_HEIGHT + dayIndex * ROW_HEIGHT}
                width={SQUARE_SIZE}
                height={SQUARE_SIZE}
                rx="2"
                fill="var(--background-alt)"
              />
            ))
          )}
        </svg>
        <p className="text-sm text-muted">Loading contributions...</p>
      </div>
    </GraphShell>
  )
}

export async function GitHubGraph() {
  const calendar = await getGitHubContributionCalendar()

  if (!calendar) {
    return (
      <GraphShell>
        <p className="text-step-0 text-muted">Unable to load contributions</p>
      </GraphShell>
    )
  }

  return (
    <GraphShell>
      <div className="space-y-4">
        <ContributionGraphSvg weeks={calendar.weeks} />
        <p className="text-sm text-muted">
          {calendar.totalContributions} contributions in the last year
        </p>
        <div className="flex justify-end">
          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </GraphShell>
  )
}
