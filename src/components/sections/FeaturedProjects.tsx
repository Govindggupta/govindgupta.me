import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ProjectCard } from "@/components/ui/ProjectCard"
import type { ProjectSummary } from "@/lib/projects"

export function FeaturedProjects({ projects }: { projects: ProjectSummary[] }) {
  const featuredProjects = projects.slice(0, 4)

  return (
    <section className="space-y-6">
      {featuredProjects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {featuredProjects
              .sort((a, b) => {
                const aHasUrl = a.live ? 1 : 0
                const bHasUrl = b.live ? 1 : 0
                return bHasUrl - aHasUrl
              })
              .map((project) => {
                const cardProject = {
                  name: project.title,
                  description: project.description,
                  url: project.github,
                  homepageUrl: project.live ?? null,
                  stargazerCount: 0,
                  forkCount: 0,
                  language: null,
                  topics: [],
                  imageUrl: project.image,
                }

                return (
                  <ProjectCard
                    key={project.slug}
                    project={cardProject}
                    slug={project.slug}
                  />
                )
              })}
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
        <p className="text-sm text-muted">No projects found.</p>
      )}
    </section>
  )
}
