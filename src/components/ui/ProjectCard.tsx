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
      className="group block h-full rounded-2xl border border-border transition-colors duration-150 dark:hover:bg-foreground/5 hover:bg-foreground/3"
      aria-label={`${project.name} project link`}
    >
      <article className="flex h-full flex-col p-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">{project.name}</h2>
          <ArrowUpRight
            size={17}
            strokeWidth={2}
            className="shrink-0 text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          />
        </div>

        {project.description ? (
          <p className="mt-2 min-h-10 line-clamp-2 text-sm text-muted">
            {project.description}
          </p>
        ) : (
          <p className="mt-2 min-h-10 text-sm text-muted">No description available.</p>
        )}

        <div className="mt-4 -mx-4 -mb-4 h-40 overflow-hidden rounded-b-2xl">
          <div className="h-full w-full origin-bottom-right -rotate-3 translate-x-7 translate-y-3 overflow-hidden rounded-2xl border-t border-border bg-neutral-100 transform-gpu transition-transform duration-150 ease-out group-hover:-rotate-1 dark:bg-neutral-900">
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
