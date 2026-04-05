import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { BlogCard } from "@/components/ui/BlogCard"
import type { BlogPostSummary } from "@/types"

export function LatestPosts({ posts }: { posts: BlogPostSummary[] }) {
  return (
    <section className="space-y-6">
      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1 text-sm text-muted transition-colors duration-150 hover:text-foreground"
            >
              <span>View all posts</span>
              <ArrowRight
                size={14}
                strokeWidth={1.9}
                className="shrink-0 translate-y-px transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted">No posts yet.</p>
      )}
    </section>
  )
}
