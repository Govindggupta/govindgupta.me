"use client"

import { useEffect, useMemo, useState } from "react"

type IndiaSnapshot = {
  day: number
  month: number
  monthLabel: string
  timeLabel: string
  weekday: string
  year: number
}

type CalendarCell = {
  day: number
  inCurrentMonth: boolean
  isToday: boolean
}

const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"]

function getPart(
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes
) {
  return parts.find((part) => part.type === type)?.value ?? ""
}

function getIndiaSnapshot(): IndiaSnapshot {
  const now = new Date()
  const dateParts = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "numeric",
    weekday: "short",
    year: "numeric",
  }).formatToParts(now)

  const timeParts = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
  }).formatToParts(now)

  const monthLabel = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    month: "long",
    year: "numeric",
  }).format(now)

  const hour = getPart(timeParts, "hour")
  const minute = getPart(timeParts, "minute")
  const dayPeriod = getPart(timeParts, "dayPeriod").toUpperCase()

  return {
    day: Number(getPart(dateParts, "day")),
    month: Number(getPart(dateParts, "month")),
    monthLabel,
    timeLabel: `${hour}:${minute} ${dayPeriod}`,
    weekday: getPart(dateParts, "weekday"),
    year: Number(getPart(dateParts, "year")),
  }
}

function buildCalendar(
  year: number,
  month: number,
  today: number
): CalendarCell[] {
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay()
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate()
  const daysInPreviousMonth = new Date(
    Date.UTC(year, month - 1, 0)
  ).getUTCDate()
  const totalCells = firstWeekday + daysInMonth <= 35 ? 35 : 42

  return Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - firstWeekday + 1

    if (dayNumber <= 0) {
      return {
        day: daysInPreviousMonth + dayNumber,
        inCurrentMonth: false,
        isToday: false,
      }
    }

    if (dayNumber > daysInMonth) {
      return {
        day: dayNumber - daysInMonth,
        inCurrentMonth: false,
        isToday: false,
      }
    }

    return {
      day: dayNumber,
      inCurrentMonth: true,
      isToday: dayNumber === today,
    }
  })
}

export default function IndianTimeCalendar() {
  const [snapshot, setSnapshot] = useState<IndiaSnapshot | null>(null)

  useEffect(() => {
    const updateSnapshot = () => {
      setSnapshot(getIndiaSnapshot())
    }

    updateSnapshot()

    const intervalId = window.setInterval(updateSnapshot, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  const calendarCells = useMemo(() => {
    if (!snapshot) {
      return []
    }

    return buildCalendar(snapshot.year, snapshot.month, snapshot.day)
  }, [snapshot])

  return (
    <div className="flex h-full min-h-0 flex-col gap-2.5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.24em] text-white/40 uppercase">
            India Time
          </p>
          <h2 className="portfolio-display mt-1.5 text-[1.55rem] leading-none text-white">
            {snapshot?.timeLabel ?? "--:--"}
          </h2>
          <p className="mt-1.5 text-[10px] tracking-[0.18em] text-white/40 uppercase">
            Asia/Kolkata • IST
          </p>
        </div>

        <div className="rounded-[0.8rem] border border-white/8 bg-black/18 px-2 py-1.5 text-right">
          <p className="text-[13px] font-semibold text-white">
            {snapshot?.weekday ?? "---"}
          </p>
          <p className="text-[9px] tracking-[0.18em] text-white/34 uppercase">
            today
          </p>
        </div>
      </div>

      <div>
        <p className="text-[10px] tracking-[0.18em] text-white/40 uppercase">
          {snapshot?.monthLabel ?? "Loading month"}
        </p>

        <div className="mt-2 grid grid-cols-7 gap-1 text-center">
          {weekdayLabels.map((label) => (
            <span
              key={label}
              className="text-[9px] tracking-[0.16em] text-white/24 uppercase"
            >
              {label}
            </span>
          ))}

          {calendarCells.map((cell, index) => (
            <span
              key={`${cell.day}-${index}`}
              className={[
                "flex aspect-square items-center justify-center rounded-[0.65rem] border text-[10px] font-medium",
                cell.isToday
                  ? "border-white/34 bg-white/10 text-white"
                  : cell.inCurrentMonth
                    ? "border-white/6 bg-white/[0.03] text-white/68"
                    : "border-transparent bg-transparent text-white/20",
              ].join(" ")}
            >
              {cell.day}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto rounded-[0.8rem] border border-white/8 bg-black/18 px-2 py-2">
        <p className="text-[9px] tracking-[0.2em] text-white/34 uppercase">
          Local note
        </p>
        <p className="mt-1.5 text-[13px] leading-5 text-white/56">
          Use this for timezone, booking hours, or availability.
        </p>
      </div>
    </div>
  )
}
