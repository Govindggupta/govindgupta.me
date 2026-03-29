import { BlogCard } from "@/components/ui/BlogCard"
import { BackLink } from "@/components/ui/BackLink"
import { PageTransition } from "@/components/ui/PageTransition"
import { getAllPosts } from "@/lib/mdx"
import { buildMetadata } from "@/lib/metadata"

export async function generateMetadata() {
  return buildMetadata({
    title: "Blog",
    description:
      "Writing on interface systems, developer workflow, and building content-first products.",
    path: "/blog",
  })
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <PageTransition className="mx-auto w-full max-w-[900px] px-4 section-space md:px-6">
      <section className="space-y-6">
        <div className="space-y-4">
          <BackLink href="/" className="mb-0">
            Back home
          </BackLink>
          <h1 className="text-2xl font-bold text-foreground">Blog</h1>
          <p className="mt-1 text-sm text-muted">
            Thoughts, learnings and things I find interesting.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
