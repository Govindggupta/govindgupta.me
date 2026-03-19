import { fallbackContributionData } from "./githubContributionFallback"

const CONTRIBUTIONS_URL = "https://github.com/users/govindggupta/contributions"
const PROFILE_URL = "https://github.com/govindggupta"
const DAY_LABELS = ["", "M", "", "W", "", "F", ""]
const CELL_SIZE = 8
const CELL_GAP = 2

const levelClasses = [
  "bg-white/[0.05]",
  "bg-white/[0.14]",
  "bg-white/[0.26]",
  "bg-white/[0.42]",
  "bg-white/[0.62]",
]

type MonthLabel = {
  col: number
  label: string
}

type ContributionData = {
  monthLabels: ReadonlyArray<MonthLabel>
  totalContributions: string
  weeks: ReadonlyArray<ReadonlyArray<number>>
}

type ContributionCell = {
  col: number
  date: string
  level: number
  row: number
}

function buildMonthLabelsFromDates(weekDates: string[]) {
  const monthLabels: MonthLabel[] = []
  let previousMonth = ""

  for (const [col, date] of weekDates.entries()) {
    if (!date) {
      continue
    }

    const month = new Date(`${date}T00:00:00Z`).toLocaleString("en-US", {
      month: "short",
      timeZone: "UTC",
    })

    if (month !== previousMonth) {
      monthLabels.push({ col, label: month })
      previousMonth = month
    }
  }

  return monthLabels
}

function parseContributionHtml(html: string): ContributionData | null {
  const tags = html.match(
    /<td\b[^>]*class="ContributionCalendar-day"[^>]*><\/td>/g
  )

  if (!tags?.length) {
    return null
  }

  const cells = tags
    .map<ContributionCell | null>((tag) => {
      const idMatch = tag.match(/id="contribution-day-component-(\d+)-(\d+)"/)
      const dateMatch = tag.match(/data-date="([^"]+)"/)
      const levelMatch = tag.match(/data-level="(\d+)"/)

      if (!idMatch || !dateMatch || !levelMatch) {
        return null
      }

      return {
        row: Number(idMatch[1]),
        col: Number(idMatch[2]),
        date: dateMatch[1],
        level: Number(levelMatch[1]),
      }
    })
    .filter((cell): cell is ContributionCell => cell !== null)

  if (!cells.length) {
    return null
  }

  const weekCount = Math.max(...cells.map((cell) => cell.col)) + 1
  const weeks = Array.from({ length: weekCount }, () => Array(7).fill(0))
  const weekDates = Array.from({ length: weekCount }, () => "")

  for (const cell of cells) {
    weeks[cell.col][cell.row] = cell.level

    if (!weekDates[cell.col]) {
      weekDates[cell.col] = cell.date
    }
  }

  const totalMatch = html.match(
    />\s*([\d,]+)\s*contributions\s*in the last year\s*</
  )

  return {
    monthLabels: buildMonthLabelsFromDates(weekDates),
    totalContributions:
      totalMatch?.[1] ?? fallbackContributionData.totalContributions,
    weeks,
  }
}

async function getContributionData(): Promise<ContributionData> {
  try {
    const response = await fetch(CONTRIBUTIONS_URL, {
      headers: {
        "User-Agent": "govindgupta.me",
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub contributions request failed: ${response.status}`)
    }

    const html = await response.text()
    const parsed = parseContributionHtml(html)

    if (!parsed) {
      throw new Error("GitHub contributions HTML could not be parsed.")
    }

    return parsed
  } catch {
    return fallbackContributionData
  }
}

export default async function ContributionHeatmap() {
  const data = await getContributionData()
  const graphWidth = data.weeks.length * (CELL_SIZE + CELL_GAP) - CELL_GAP

  return (
    <div className="flex h-full min-h-0 flex-col gap-2.5">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] tracking-[0.28em] text-white/42 uppercase">
            GitHub
          </p>
          <a
            href={PROFILE_URL}
            className="portfolio-display mt-1 block truncate text-[1.35rem] leading-none text-white"
          >
            github.com/govindggupta
          </a>
        </div>
        <div className="rounded-[0.75rem] border border-white/10 bg-black/18 px-2 py-1.5 text-right">
          <p className="text-sm font-semibold text-white">
            {data.totalContributions}
          </p>
          <p className="text-[10px] tracking-[0.18em] text-white/36 uppercase">
            last year
          </p>
        </div>
      </div>

      <div className="min-h-0 rounded-[0.9rem] border border-white/10 bg-black/18 px-2 py-2.5">
        <div className="grid grid-cols-[16px_1fr] gap-2">
          <div className="grid grid-rows-7 gap-[2px] pt-4 text-[9px] tracking-[0.18em] text-white/24 uppercase">
            {DAY_LABELS.map((label, index) => (
              <span key={`${label}-${index}`} className="flex h-2 items-center">
                {label}
              </span>
            ))}
          </div>

          <div className="min-w-0">
            <div
              className="relative mx-auto h-4"
              style={{ width: `${graphWidth}px` }}
            >
              {data.monthLabels.map((item) => (
                <span
                  key={`${item.label}-${item.col}`}
                  className="absolute text-[9px] tracking-[0.18em] text-white/24 uppercase"
                  style={{ left: `${item.col * (CELL_SIZE + CELL_GAP)}px` }}
                >
                  {item.label}
                </span>
              ))}
            </div>

            <div
              className="mt-1 grid justify-center gap-[2px]"
              style={{
                gridTemplateColumns: `repeat(${data.weeks.length}, ${CELL_SIZE}px)`,
              }}
            >
              {data.weeks.map((week, weekIndex) => (
                <div
                  key={`week-${weekIndex}`}
                  className="grid grid-rows-7 gap-[2px]"
                >
                  {week.map((level, dayIndex) => (
                    <span
                      key={`cell-${weekIndex}-${dayIndex}`}
                      className={`h-2 w-2 rounded-[2px] ${levelClasses[level]}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 text-[10px] tracking-[0.18em] text-white/34 uppercase">
        <span>Official profile graph</span>
        <a
          href={CONTRIBUTIONS_URL}
          className="text-white/58 transition hover:text-white"
        >
          Open source
        </a>
      </div>
    </div>
  )
}
