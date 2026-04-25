"use client"

import { useEffect, useState } from "react"

import { Tooltip } from "@/components/ui/Tooltip"

type HeroTimeSnapshot = {
  differenceLabel: string
  timeLabel: string
}

const homeTimeZone = "Asia/Kolkata"

function getTimeZoneOffsetMinutes(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date)

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value])
  )

  const asUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second)
  )

  return (asUtc - date.getTime()) / 60000
}

function formatDifferenceLabel(offsetDifferenceMinutes: number) {
  if (offsetDifferenceMinutes === 0) {
    return "same time"
  }

  const absoluteDifference = Math.abs(offsetDifferenceMinutes)
  const hours = Math.floor(absoluteDifference / 60)
  const minutes = absoluteDifference % 60
  const parts: string[] = []

  if (hours > 0) {
    parts.push(`${hours}h`)
  }

  if (minutes > 0) {
    parts.push(`${minutes}m`)
  }

  return `${parts.join(" ")} ${
    offsetDifferenceMinutes > 0 ? "ahead" : "behind"
  }`
}

function getHeroTimeSnapshot(): HeroTimeSnapshot {
  const now = new Date()
  const viewerTimeZone =
    Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC"
  const homeOffsetMinutes = getTimeZoneOffsetMinutes(now, homeTimeZone)
  const viewerOffsetMinutes = getTimeZoneOffsetMinutes(now, viewerTimeZone)

  return {
    timeLabel: new Intl.DateTimeFormat("en-GB", {
      timeZone: homeTimeZone,
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
    }).format(now),
    differenceLabel: formatDifferenceLabel(
      homeOffsetMinutes - viewerOffsetMinutes
    ),
  }
}

export function HeroLocalTime() {
  const [snapshot, setSnapshot] = useState<HeroTimeSnapshot | null>(null)

  useEffect(() => {
    const updateSnapshot = () => {
      setSnapshot(getHeroTimeSnapshot())
    }

    updateSnapshot()

    const intervalId = window.setInterval(updateSnapshot, 30_000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <span className="flex min-w-0 flex-wrap items-center gap-1.5">
      <span className="group relative inline-flex">
        <span>{snapshot?.timeLabel ?? "--:--"}</span>

        <Tooltip className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
          Asia/Kolkata
        </Tooltip>
      </span>

      <span className="text-muted/80">{"//"}</span>
      <span className="text-muted">
        {snapshot?.differenceLabel ?? "calculating"}
      </span>
    </span>
  )
}
