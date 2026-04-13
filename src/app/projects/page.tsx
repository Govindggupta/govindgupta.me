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
    <PageTransition className="mx-auto w-full max-w-225 px-4 section-space md:px-6">
      <section className="space-y-6">
        <div className="space-y-4">
          <BackLink href="/" className="mb-0">
            Back home
          </BackLink>
          <h1 className="text-4xl font-bold text-foreground">Projects</h1>
        </div>

        {repos.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {repos
              .sort((a, b) => {
                const aHasUrl = a.homepageUrl ? 1 : 0
                const bHasUrl = b.homepageUrl ? 1 : 0
                return bHasUrl - aHasUrl
              })
              .map((repo) => (
                <ProjectCard key={repo.name} project={repo} />
              ))}
          </div>
        ) : (
          <p className="text-sm text-muted">No pinned repositories found.</p>
        )}
      </section>
    </PageTransition>
  )
}
