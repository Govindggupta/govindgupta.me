import Link from "next/link"

import { ProjectCard } from "@/components/ui/ProjectCard"
import { getPinnedRepos } from "@/lib/github"

export async function FeaturedProjects() {
  const repos = await getPinnedRepos()
  const featuredRepos = repos.slice(0, 4)

  return (
    <section className="space-y-6 border-t border-border pt-10">
      <p className="text-xs tracking-widest text-muted uppercase">Projects</p>

      {featuredRepos.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {featuredRepos.map((repo, index) => (
            <ProjectCard key={repo.name} project={repo} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">No pinned repositories found.</p>
      )}

      <div className="flex justify-end">
        <Link
          href="/projects"
          className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
        >
          View all projects →
        </Link>
      </div>
    </section>
  )
}
