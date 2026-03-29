import { ProjectCard } from "@/components/ui/ProjectCard"
import { BackLink } from "@/components/ui/BackLink"
import { PageTransition } from "@/components/ui/PageTransition"
import { getPinnedRepos } from "@/lib/github"
import { buildMetadata } from "@/lib/metadata"

export async function generateMetadata() {
  return buildMetadata({
    title: "Projects",
    description:
      "A small selection of product builds spanning dashboards, publishing systems, and internal tooling.",
    path: "/projects",
  })
}

export default async function ProjectsPage() {
  const repos = await getPinnedRepos()

  return (
    <PageTransition className="mx-auto w-full max-w-[900px] px-4 section-space md:px-6">
      <section className="space-y-6">
        <div className="space-y-4">
          <BackLink href="/" className="mb-0">
            Back home
          </BackLink>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="mt-1 text-sm text-muted">Things I&apos;ve built.</p>
        </div>

        {repos.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {repos.map((repo, index) => (
              <ProjectCard key={repo.name} project={repo} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">No pinned repositories found.</p>
        )}
      </section>
    </PageTransition>
  )
}
