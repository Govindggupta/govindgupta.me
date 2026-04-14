import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ExternalLink, Github } from "lucide-react"

import { BackLink } from "@/components/ui/BackLink"
import { PageTransition } from "@/components/ui/PageTransition"
import {
  getProjectBySlug,
  getProjectSlugs,
  type ProjectStatus,
} from "@/lib/projects"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export const dynamicParams = false

function formatStatus(status: ProjectStatus) {
  switch (status) {
    case "in-progress":
      return "In Progress"
    case "completed":
      return "Completed"
    case "archived":
      return "Archived"
    default:
      return status
  }
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()

  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found — Govind Gupta",
      description: "Project not found.",
    }
  }

  return {
    title: `${project.title} — Govind Gupta`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `https://govindgupta.me/projects/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      site: "@3g_g0vind",
      title: project.title,
      description: project.description,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <PageTransition className="mx-auto max-w-225 px-4 section-space pb-16 md:px-6">
      <article>
        <div className="space-y-4">
          <BackLink href="/projects" className="mb-0">
            Back to projects
          </BackLink>

          <header>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground">
                  {project.title}
                </h1>
                <p className="mt-4 text-step-0 text-muted">
                  {project.description}
                </p>
              </div>
              {/* <span className="rounded-md border border-border px-2 py-0.5 text-xs text-foreground">
                {formatStatus(project.status)}
              </span> */}
            </div>

            {/* <div className="mt-4 flex flex-wrap items-center gap-3">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border px-2 py-0.5 text-xs text-muted"
                >
                  {item}
                </span>
              ))}
              <time dateTime={project.date} className="text-xs text-muted">
                {formatProjectDate(project.date)}
              </time>
            </div> */}

            <div className="mt-4 flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-150 hover:text-foreground"
              >
                <Github size={14} strokeWidth={1.8} />
                <span>View source</span>
              </a>

              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-150 hover:text-foreground"
                >
                  <ExternalLink size={14} strokeWidth={1.8} />
                  <span>Live site</span>
                </a>
              ) : null}
            </div>
          </header>
        </div>

        <div className="relative mt-8 mb-8 aspect-1200/630 w-full overflow-hidden rounded-2xl border border-border">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover object-top"
            unoptimized
          />
        </div>

        <div className="prose-story">{project.content}</div>

        <footer className="flex items-center justify-between gap-4">
          <BackLink href="/projects" className="!mb-0 shrink-0 whitespace-nowrap">
            Back to projects
          </BackLink>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center whitespace-nowrap text-sm text-muted transition-colors duration-150 hover:text-foreground"
          >
            View on GitHub -&gt;
          </a>
        </footer>
      </article>
    </PageTransition>
  )
}
