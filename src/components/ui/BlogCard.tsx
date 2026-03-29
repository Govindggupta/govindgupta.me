"use client"

import { useState } from "react"

import Image from "next/image"
import Link from "next/link"

import type { BlogPostSummary } from "@/types"

interface BlogCardProps {
  post: BlogPostSummary
}

function formatCardDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

export function BlogCard({ post }: BlogCardProps) {
  const [hasImageError, setHasImageError] = useState(false)
  const showCover = Boolean(post.cover) && !hasImageError

  return (
    <article className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="group block h-full overflow-hidden rounded-2xl border border-border transition-colors duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-900"
      >
        <div className="relative aspect-[16/7] w-full overflow-hidden border-b border-border bg-neutral-100 dark:bg-neutral-800">
          {showCover ? (
            <Image
              src={post.cover ?? ""}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
              onError={() => setHasImageError(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center">
              <p className="line-clamp-2 max-w-[22rem] text-xl font-semibold tracking-tight text-foreground/20 md:text-2xl">
                {post.title}
              </p>
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <p className="font-medium text-muted">Govind Gupta</p>
            <p className="text-muted">{formatCardDate(post.date)}</p>
          </div>

          <h2 className="mt-3 text-base font-semibold leading-snug text-foreground transition-opacity duration-200 group-hover:opacity-70">
            {post.title}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm text-muted">
            {post.description}
          </p>

          <p className="mt-4 text-sm font-medium text-foreground underline decoration-border decoration-[1px] underline-offset-[3px]">
            Read article →
          </p>
        </div>
      </Link>
    </article>
  )
}
