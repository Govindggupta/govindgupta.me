import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { PageTransition } from "@/components/ui/PageTransition"
import { ReadingProgress } from "@/components/ui/ReadingProgress"
import { formatDate, getBlogSlugs, getPostBySlug } from "@/lib/mdx"
import { buildMetadata } from "@/lib/metadata"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await getBlogSlugs()

  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return buildMetadata({
      title: "Post Not Found",
      path: `/blog/${slug}`,
    })
  }

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <ReadingProgress />
      <PageTransition className="mx-auto w-full max-w-[900px] px-4 section-space md:px-6">
        <article className="space-y-12">
          <div className="space-y-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-muted hover:underline"
            >
              <ArrowLeft size={14} />
              <span>Back to blog</span>
            </Link>

            <header className="space-y-4 border-b border-border pb-10">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.16em] text-muted uppercase">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.tags.join(" / ")}</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-heading text-step-4 tracking-[-0.06em] text-foreground">
                  {post.title}
                </h1>
                <p className="max-w-[900px] text-step-0 text-muted">
                  {post.description}
                </p>
              </div>
            </header>
          </div>

          <div className="prose-story">{post.content}</div>
        </article>
      </PageTransition>
    </>
  )
}
