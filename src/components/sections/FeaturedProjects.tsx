import Link from "next/link"

import { ProjectCard } from "@/components/ui/ProjectCard"
import type { PinnedRepo } from "@/types"

export function FeaturedProjects({
  repos,
}: {
  repos: PinnedRepo[]
}) {
  const featuredRepos = repos.slice(0, 4)

  return (
    <section className="space-y-6">
      {featuredRepos.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {featuredRepos.map((repo, index) => (
              <ProjectCard key={repo.name} project={repo} index={index} />
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/projects"
              className="text-sm text-muted transition-colors duration-150 hover:text-foreground"
            >
              View all projects →
            </Link>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted">No pinned repositories found.</p>
      )}
    </section>
  )
}
