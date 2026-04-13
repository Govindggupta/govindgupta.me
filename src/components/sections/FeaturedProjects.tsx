import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ProjectCard } from "@/components/ui/ProjectCard"
import type { PinnedRepo } from "@/types"

export function FeaturedProjects({ repos }: { repos: PinnedRepo[] }) {
  const featuredRepos = repos.slice(0, 4)

  return (
    <section className="space-y-6">
      {featuredRepos.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {featuredRepos
              .sort((a, b) => {
                const aHasUrl = a.homepageUrl ? 1 : 0
                const bHasUrl = b.homepageUrl ? 1 : 0
                return bHasUrl - aHasUrl
              })
              .map((repo) => (
                <ProjectCard key={repo.name} project={repo} />
              ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1 text-sm text-muted transition-colors duration-150 hover:text-foreground"
            >
              <span>View all projects</span>
              <ArrowRight
                size={14}
                strokeWidth={1.9}
                className="shrink-0 translate-y-px transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted">No pinned repositories found.</p>
      )}
    </section>
  )
}
