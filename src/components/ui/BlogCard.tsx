"use client"

import { useState } from "react"

import Image from "next/image"
import Link from "next/link"

import type { BlogPostSummary } from "@/types"
import { ArrowRight } from "lucide-react"

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
        className="group block self-start overflow-hidden rounded-2xl border border-border transition-colors duration-200 hover:bg-foreground/2.5 dark:hover:bg-foreground/5"
      >
        <div className="relative mx-2 mt-2 aspect-1200/630 overflow-hidden rounded-xl border border-border bg-neutral-200 dark:bg-neutral-800">
          {showCover ? (
            <Image
              src={post.cover ?? ""}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover object-top transition-transform duration-300"
              onError={() => setHasImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800">
              <span className="relative z-10 px-4 text-center text-[clamp(0.85rem,2.2vw,1.1rem)] leading-snug font-medium tracking-tight break-words text-muted">
                {post.title}
              </span>
            </div>
          )}
        </div>
        <div className="flex min-h-0 flex-col">
          <div className="flex flex-col justify-around px-4 mt-4 mb-4">
            <h2 className="flex text-lg font-semibold text-foreground transition-opacity duration-200">
              {post.title}
            </h2>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-sm text-muted">{formatCardDate(post.date)}</p>
              <p className="shrink-0 text-sm font-medium text-muted underline decoration-border decoration-1 underline-offset-[3px]">
                <span className="inline-flex items-center gap-1">
                  {post.readTimeText}
                  <ArrowRight
                    size={14}
                    strokeWidth={1.9}
                    className="mt-px shrink-0 text-muted transition-all duration-150 ease-in-out group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
