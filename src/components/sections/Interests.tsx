"use client"

import { motion } from "framer-motion"

import { interests } from "@/data/interests"

export function Interests() {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-foreground">
          Outside of Work
        </h2>
        <p className="text-xs italic text-muted">in no order of preference</p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {interests.map((interest) => (
          <InterestTile key={interest.label} interest={interest} />
        ))}
      </div>
    </section>
  )
}

function InterestTile({ interest }: { interest: (typeof interests)[number] }) {
  const isWide = interest.colSpan === 2
  const isBanner = interest.colSpan === 4

  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={[
        "noise-tile overflow-hidden rounded-2xl border border-border bg-neutral-100 p-3 transition-colors duration-150 hover:border-neutral-400 hover:bg-[#ededed] dark:bg-neutral-900 dark:hover:border-neutral-600 dark:hover:bg-neutral-800",
        isBanner ? "col-span-2 min-h-[56px] sm:col-span-4" : "min-h-[88px]",
        isWide ? "sm:col-span-2" : "",
      ].join(" ")}
    >
      {isBanner ? (
        <div className="relative z-[1] flex h-full items-center justify-between gap-4">
          <p className="text-sm font-medium leading-tight text-foreground">
            {interest.label}
          </p>
          <span className="select-none text-2xl" aria-hidden="true">
            {interest.emoji}
          </span>
        </div>
      ) : isWide ? (
        <div className="relative z-[1] flex h-full flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium leading-tight text-foreground">
            {interest.label}
          </p>
          <span className="select-none text-4xl" aria-hidden="true">
            {interest.emoji}
          </span>
        </div>
      ) : (
        <div className="relative z-[1] flex h-full flex-col justify-between">
          <p className="text-sm font-medium leading-tight text-foreground">
            {interest.label}
          </p>
          <span
            className="mt-2 self-end text-3xl leading-none select-none"
            aria-hidden="true"
          >
            {interest.emoji}
          </span>
        </div>
      )}
    </motion.div>
  )
}
