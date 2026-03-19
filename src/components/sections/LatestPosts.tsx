import { readFile, readdir } from "node:fs/promises"
import path from "node:path"

import Link from "next/link"

import matter from "gray-matter"

import { formatDate } from "@/lib/mdx"

const BLOG_DIRECTORY = path.join(process.cwd(), "src", "content", "blog")

interface LatestPostItem {
  slug: string
  title: string
  date: string
  readTime: string
}

function getReadTime(content: string) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(wordCount / 200))} min read`
}

async function getLatestPosts(): Promise<LatestPostItem[]> {
  const entries = await readdir(BLOG_DIRECTORY)
  const posts = await Promise.all(
    entries
      .filter((entry) => entry.endsWith(".mdx"))
      .map(async (entry) => {
        const slug = entry.replace(/\.mdx$/, "")
        const source = await readFile(path.join(BLOG_DIRECTORY, entry), "utf8")
        const { content, data } = matter(source)

        return {
          slug,
          title: typeof data.title === "string" ? data.title : slug,
          date: typeof data.date === "string" ? data.date : "",
          readTime: getReadTime(content),
        }
      })
  )

  return posts
    .sort(
      (left, right) =>
        new Date(right.date).getTime() - new Date(left.date).getTime()
    )
    .slice(0, 3)
}

export async function LatestPosts() {
  const posts = await getLatestPosts()

  return (
    <section className="space-y-6 border-t border-border pt-10">
      <p className="text-xs tracking-widest text-muted uppercase">Writing</p>

      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex items-baseline justify-between gap-4 border-b border-border py-3 last:border-0"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-medium text-foreground transition-colors duration-200 hover:underline"
              >
                {post.title}
              </Link>

              <p className="shrink-0 text-xs text-muted">
                {formatDate(post.date)} · {post.readTime}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">No posts yet.</p>
      )}

      <div className="flex justify-end">
        <Link
          href="/blog"
          className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
        >
          View all posts →
        </Link>
      </div>
    </section>
  )
}
