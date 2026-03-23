import type { ReactNode } from "react"

import { githubProfileUrl, getGitHubContributionCalendar } from "@/lib/github"

import { GitHubContributionGraphClient } from "./GitHubContributionGraphClient"

const SQUARE_SIZE = 10
const SQUARE_GAP = 3
const COLUMN_WIDTH = SQUARE_SIZE + SQUARE_GAP
const ROW_HEIGHT = SQUARE_SIZE + SQUARE_GAP
const MONTH_LABEL_HEIGHT = 22
const GRAPH_WIDTH = 673
const GRAPH_HEIGHT = 120

function GraphShell({ children }: Readonly<{ children: ReactNode }>) {
  return <section>{children}</section>
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
      <GitHubContributionGraphClient
        weeks={calendar.weeks}
        totalContributions={calendar.totalContributions}
      />
    </GraphShell>
  )
}
export const githubSectionLink = githubProfileUrl
