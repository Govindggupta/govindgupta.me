"use client"

import { useState } from "react"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import type { PinnedRepo } from "@/types"

interface ProjectCardProps {
  project: PinnedRepo
}

function getProjectInitials(name: string) {
  const parts = name
    .split(/[\s-_]+/)
    .filter(Boolean)
    .slice(0, 2)

  if (parts.length === 0) {
    return "PR"
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("")
}

function getPreviewUrl(homepageUrl: string) {
  return `https://api.microlink.io?url=${encodeURIComponent(homepageUrl)}&screenshot=true&meta=false&embed=screenshot.url`
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const previewUrl =
    project.homepageUrl && !imageFailed
      ? getPreviewUrl(project.homepageUrl)
      : null
  const projectHref = project.homepageUrl ?? project.url

  return (
    <a
      href={projectHref}
      target="_blank"
      rel="noreferrer"
      className="group block h-full rounded-2xl border border-border transition-colors duration-150 dark:hover:bg-foreground/5 hover:bg-foreground/2.5"
      aria-label={`${project.name} project link`}
    >
      <article className="flex h-full flex-col p-4">
        <div className="flex items-center gap-1 justify-between">
          <h2 className="text-lg font-semibold text-foreground">{project.name}</h2>
          <span className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-border text-black dark:text-white">
            <ArrowUpRight
              size={17}
              strokeWidth={2}
              className="absolute transition-all duration-200 ease-out group-hover:translate-x-5 group-hover:-translate-y-5 group-hover:opacity-0 "
            />
            <ArrowUpRight
              size={17}
              strokeWidth={2}
              className="absolute -translate-x-5 translate-y-5 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
            />
          </span>
        </div>

        {project.description ? (
          <p className="mt-2 min-h-10 line-clamp-2 text-sm text-muted">
            {project.description}
          </p>
        ) : (
          <p className="mt-2 min-h-10 text-sm text-muted">No description available.</p>
        )}

        <div className="mt-4 -mx-4 -mb-4 h-40 overflow-hidden rounded-b-2xl">
          <div className="h-full w-full origin-bottom-right -rotate-5 translate-x-7 translate-y-1 overflow-hidden rounded-2xl border border-black/12 border-t border-t-border bg-neutral-100 shadow-[0_4px_10px_rgba(0,0,0,0.18)] transform-gpu transition-transform duration-150 ease-out group-hover:-rotate-1 dark:border-border dark:bg-neutral-900 dark:shadow-none">
            {previewUrl ? (
              <div className="relative h-full w-full bg-neutral-200 dark:bg-neutral-800">
                <Image
                  src={previewUrl}
                  alt={`${project.name} preview`}
                  fill
                  sizes="(min-width: 768px) 420px, 100vw"
                  className="object-cover object-top"
                  onError={() => setImageFailed(true)}
                  unoptimized
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-neutral-200 dark:bg-neutral-800">
                <span className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                  {getProjectInitials(project.name)}
                </span>
              </div>
            )}
          </div>
        </div>
      </article>
    </a>
  )
}
