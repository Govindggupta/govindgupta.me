import Link from "next/link"

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
              className="text-sm text-muted transition-colors duration-150 hover:text-foreground"
            >
              View all posts →
            </Link>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted">No posts yet.</p>
      )}
    </section>
  )
}
