import Link from "next/link"

import { formatDate } from "@/lib/mdx"
import type { BlogPostSummary } from "@/types"

interface BlogCardProps {
  post: BlogPostSummary
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="border-b border-border py-6 first:pt-0 last:border-b-0 last:pb-0">
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="grid gap-3 md:grid-cols-[7.5rem_1fr] md:gap-6">
          <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
            {formatDate(post.date)}
          </p>

          <div className="space-y-2">
            <h2 className="font-heading text-step-1 tracking-[-0.04em] text-foreground transition-opacity duration-200 group-hover:opacity-60">
              {post.title}
            </h2>
            <p className="text-step-0 text-foreground-soft">
              {post.description}
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}
