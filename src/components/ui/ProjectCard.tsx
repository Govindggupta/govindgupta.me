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
      className="group block aspect-[10/6.180] w-full self-start overflow-hidden rounded-2xl border border-border transition-colors duration-150 hover:bg-foreground/2.5 dark:hover:bg-foreground/5"
      aria-label={`${project.name} project link`}
    >
      <article className="flex h-full min-h-0 flex-col p-4">
        <div className="flex items-start justify-between gap-4 h-14">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-foreground">
              {project.name}
            </h2>
            {project.description ? (
              <p className="mt-2 line-clamp-2 min-h-10 text-sm text-muted">
                {project.description}
              </p>
            ) : (
              <p className="mt-2 min-h-10 text-sm text-muted">
                No description available.
              </p>
            )}
          </div>
          <div className="shrink-0">
            <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden text-black dark:text-white">
              <ArrowUpRight
                size={17}
                strokeWidth={2}
                className="absolute -translate-x-2 translate-y-2 opacity-0 transition-all duration-150 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
              />
            </span>
          </div>
        </div>

        <div className="-mx-4 mt-4 -mb-4 min-h-0 flex-1 overflow-hidden rounded-b-2xl">
          <div className="h-full w-full origin-bottom-right translate-x-12 translate-y-0 -rotate-5 transform-gpu overflow-hidden rounded-2xl border border-t border-black/12 border-t-border bg-neutral-100 shadow-[0_4px_10px_rgba(0,0,0,0.18)] transition-transform duration-150 ease-out group-hover:-rotate-1 dark:border-border dark:bg-neutral-900 dark:shadow-none">
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
