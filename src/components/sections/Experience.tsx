"use client"

import { useState } from "react"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

import { experiences, type Experience as ExperienceItem } from "@/data/experience"

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

export function Experience() {
  const [expanded, setExpanded] = useState(false)

  if (experiences.length === 0) {
    return null
  }

  const visibleExperiences = expanded ? experiences : experiences.slice(0, 2)

  return (
    <section>
      <AnimatePresence initial={false}>
        {visibleExperiences.map((experience, index) => {
          const companyContent = experience.url ? (
            <a
              href={experience.url}
              target="_blank"
              rel="noreferrer"
              className="transition-opacity duration-200 hover:opacity-70"
            >
              {experience.company}
            </a>
          ) : (
            experience.company
          )

          return (
            <motion.div
              key={`${experience.company}-${experience.role}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {companyContent}
                      </p>
                      {experience.current ? (
                        <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">
                          Current
                        </span>
                      ) : null}
                    </div>
                    <p className="text-sm text-muted">
                      {experience.role} · {experience.location}
                    </p>
                  </div>

                  <div className="shrink-0 space-y-1 text-right">
                    <p className="text-xs text-muted">{experience.duration}</p>
                    <span className="inline-flex rounded-md border border-border px-2 py-0.5 text-xs text-muted">
                      {formatType(experience.type)}
                    </span>
                  </div>
                </div>

                {experience.description.length > 0 ? (
                  <div className="space-y-1.5">
                    {experience.description.slice(0, 3).map((point) => (
                      <p
                        key={point}
                        className="text-sm leading-relaxed text-muted"
                      >
                        – {point}
                      </p>
                    ))}
                  </div>
                ) : null}

                {experience.tech.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {experience.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-border px-2 py-0.5 text-xs text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              {index < visibleExperiences.length - 1 ? (
                <hr className="my-6 border-border" />
              ) : null}
            </motion.div>
          )
        })}
      </AnimatePresence>

      {experiences.length > 2 ? (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="mt-2 flex w-full items-center justify-center gap-1.5 text-sm text-muted transition-colors duration-150 hover:text-foreground"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          <span>{expanded ? "Show less" : "Show more"}</span>
        </button>
      ) : null}
    </section>
  )
}
