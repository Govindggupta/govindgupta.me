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
        className="group grid aspect-[10/6.180] h-full w-full grid-rows-[1.618fr_1fr] self-start overflow-hidden rounded-2xl border border-border transition-colors duration-200 hover:bg-foreground/2.5 dark:hover:bg-foreground/5"
      >
        <div className="min-h-0 overflow-hidden">
          <div className="relative h-full w-full overflow-hidden rounded-t-xl bg-neutral-100 dark:bg-neutral-800">
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
                <p className="line-clamp-2 max-w-88 text-xl font-semibold tracking-tight text-foreground/20 md:text-2xl">
                  {post.title}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 flex flex-col justify-around">
          <h2 className="font-semibold text-foreground transition-opacity duration-200 text-lg flex">
            {post.title}
          </h2>
          <div className="flex items-center justify-between gap-3 ">
            <p className="text-sm text-muted">{formatCardDate(post.date)}</p>
            <p className="shrink-0 text-sm font-medium text-muted underline decoration-border decoration-1 underline-offset-[3px]">
              <span className="inline-flex items-center gap-1">
                Read article
                <ArrowRight
                  size={14}
                  strokeWidth={1.9}
                  className="mt-px shrink-0 text-muted transition-all duration-150 ease-in-out group-hover:translate-x-0.5 group-hover:text-white"
                />
              </span>
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}
