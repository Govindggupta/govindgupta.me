"use client"

import { useState } from "react"

import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronUp, Code2 } from "lucide-react"

import { experiences, type Experience as ExperienceItem } from "@/data/experience"
import VerticalBar from "@/components/ui/VerticalBar"

const itemMotionTransition = {
  duration: 0.24,
  ease: [0.22, 1, 0.36, 1] as const,
}

function formatType(type: ExperienceItem["type"]) {
  switch (type) {
    case "full-time":
      return "Full-time"
    case "part-time":
      return "Part-time"
    case "internship":
      return "Internship"
    case "freelance":
      return "Freelance"
    default:
      return type
  }
}

function getCompanyInitial(company: string) {
  const match = company.match(/[A-Za-z0-9]/)
  return match?.[0]?.toUpperCase() ?? "C"
}

function ExperienceAvatar({ experience }: { experience: ExperienceItem }) {
  const baseClasses =
    "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-background sm:h-10 sm:w-10"

  if (experience.logo) {
    return (
      <div className={baseClasses}>
        <Image
          src={experience.logo}
          alt={`${experience.company} logo`}
          fill
          sizes="(min-width: 640px) 40px, 32px"
          className="object-contain p-1.5"
        />
      </div>
    )
  }

  return (
    <div className={`${baseClasses} bg-neutral-100 dark:bg-neutral-800`}>
      <span className="text-xs font-semibold text-foreground sm:text-sm">
        {getCompanyInitial(experience.company)}
      </span>
    </div>
  )
}

function ExperienceAccordionItem({
  experience,
  index,
  isOpen,
  onToggle,
}: {
  experience: ExperienceItem
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const companyContent = experience.url ? (
    <a
      href={experience.url}
      target="_blank"
      rel="noreferrer"
      onClick={(event) => event.stopPropagation()}
      className="underline decoration-border decoration-[1px] underline-offset-[3px] hover:opacity-70"
    >
      {experience.company}
    </a>
  ) : (
    experience.company
  )

  return (
    <motion.div
      key={`${experience.company}-${experience.role}`}
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.985 }}
      transition={{
        opacity: {
          ...itemMotionTransition,
          delay: index * 0.08,
        },
        y: {
          ...itemMotionTransition,
          delay: index * 0.08,
        },
        scale: itemMotionTransition,
      }}
      className="pt-6 pb-6 first:pt-0 last:pb-0"
    >
      <div className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-2.5 gap-y-3 pb-3 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-x-3.5">
        <div className="flex items-center justify-center">
          <ExperienceAvatar experience={experience} />
        </div>

        <div className="min-w-0 flex items-center gap-2">
          <p className="text-base font-semibold tracking-tight text-foreground sm:text-[1.1rem]">
            {companyContent}
          </p>
          {experience.current ? (
            <span
              className="relative inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center"
              title="Currently working here"
              aria-label="Currently working here"
            >
              <span className="absolute h-4 w-4 rounded-full bg-green-400/20 blur-[4px]" />
              <span className="absolute h-3 w-3 rounded-full bg-green-400/25 blur-[2px]" />
              <span className="relative h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8),0_0_18px_rgba(34,197,94,0.35)]" />
            </span>
          ) : null}
        </div>

        <div className="flex items-center justify-center">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-background-alt/70 text-muted sm:h-[26px] sm:w-[26px]">
            <Code2 size={13} strokeWidth={1.8} />
          </span>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={onToggle}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              onToggle()
            }
          }}
          className="group min-w-0 cursor-pointer rounded-xl py-1.5 text-left transition-colors duration-150 hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-base font-medium leading-tight text-foreground sm:text-[1.02rem]">
                {experience.role}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-muted">
                <span className="text-sm">{experience.location}</span>
                <VerticalBar />
                <span className="text-sm">{experience.duration}</span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-md border border-border bg-neutral-100/80 px-1.5 py-0.5 text-xs font-normal text-muted dark:bg-neutral-900/70">
                {formatType(experience.type)}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-muted transition-colors duration-150 group-hover:text-foreground"
              >
                <ChevronUp size={13} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && experience.description.length > 0 ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-2.5 pt-4 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-x-3.5">
              <div />
              <div className="space-y-3">
                {experience.description.slice(0, 3).map((point) => (
                  <div
                    key={point}
                    className="relative pl-5 text-[15px] leading-relaxed text-foreground/90 before:absolute before:top-[0.62em] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-foreground/45 sm:text-base"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {experience.tech.length > 0 ? (
        <div className="mt-4 grid grid-cols-[2rem_minmax(0,1fr)] gap-x-2.5 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-x-3.5">
          <div />
          <div className="flex flex-wrap gap-2">
            {experience.tech.map((item) => (
              <span
                key={item}
                    className="rounded-md border border-border bg-neutral-100/80 px-1 py-0.5 text-xs text-muted transition-colors duration-150 hover:bg-neutral-200/70 dark:bg-neutral-900/70 dark:hover:bg-neutral-800/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </motion.div>
  )
}

export function Experience() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]))

  if (experiences.length === 0) {
    return null
  }

  const toggleItem = (index: number) => {
    setOpenItems((previous) => {
      const next = new Set(previous)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <section>
      {experiences.map((experience, index) => (
        <ExperienceAccordionItem
          key={`${experience.company}-${experience.role}`}
          experience={experience}
          index={index}
          isOpen={openItems.has(index)}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </section>
  )
}
