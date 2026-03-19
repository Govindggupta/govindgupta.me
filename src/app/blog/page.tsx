import { BlogCard } from "@/components/ui/BlogCard"
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
      <section className="space-y-10">
        <div className="space-y-3">
          <h1 className="font-heading text-step-4 tracking-[-0.06em] text-foreground">
            Blog
          </h1>
          <p className="max-w-[900px] text-step-0 text-muted">
            Notes on building better product surfaces, calmer tooling, and
            cleaner frontend systems.
          </p>
        </div>

        <div>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
