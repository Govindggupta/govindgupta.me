"use client"

import { useState } from "react"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import type { PinnedRepo } from "@/types"

interface ProjectCardProps {
  project: PinnedRepo
  index: number
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

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const isFeatured = index < 2
  const previewUrl =
    project.homepageUrl && !imageFailed
      ? getPreviewUrl(project.homepageUrl)
      : null
  const projectHref = project.homepageUrl ?? project.url

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-transparent transition-colors duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-900">
      <div className="bg-neutral-100 p-3 dark:bg-neutral-900">
        <div className="relative overflow-hidden rounded-xl border border-border">
          {isFeatured ? (
            <span className="absolute top-2 left-2 z-10 rounded-md border border-white/10 bg-neutral-900/80 px-2 py-0.5 text-xs text-white backdrop-blur-sm dark:bg-white/10">
              Featured
            </span>
          ) : null}

          <div className="border-b border-border bg-background-alt px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="h-2 w-2 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            </div>
          </div>

          {previewUrl ? (
            <div className="relative aspect-video bg-neutral-200 dark:bg-neutral-800">
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
            <div className="flex aspect-video items-center justify-center bg-neutral-200 dark:bg-neutral-800">
              <span className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                {getProjectInitials(project.name)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-semibold text-foreground">
            {project.name}
          </h2>

          {project.homepageUrl ? (
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-500" />
              <span>Live</span>
            </div>
          ) : null}
        </div>

        {project.description ? (
          <p className="mt-2 line-clamp-2 text-sm text-muted">
            {project.description}
          </p>
        ) : null}

        <div className="mt-4">
          <a
            href={projectHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-opacity duration-200 hover:underline"
          >
            View Project
            <ArrowUpRight size={14} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </article>
  )
}
