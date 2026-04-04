import { Suspense } from "react"
import Link from "next/link"

import {
  GitHubGraph,
  GitHubGraphFallback,
  githubSectionLink,
} from "@/components/sections/githubgraph/GitHubGraph"
import { About } from "@/components/sections/About"
import { Experience } from "@/components/sections/Experience"
import { FeaturedProjects } from "@/components/sections/FeaturedProjects"
import { Hero } from "@/components/sections/Hero"
import { LatestPosts } from "@/components/sections/LatestPosts"
import { TechStack } from "@/components/sections/TechStack"
import { SectionReveal } from "@/components/ui/SectionReveal"
import { experiences } from "@/data/experience"
import { getAllPosts } from "@/lib/mdx"
import { buildMetadata } from "@/lib/metadata"
import { getPinnedRepos } from "@/lib/github"
import { Interests } from "@/components/sections/Interests"

function HomeSectionHeader({
  title,
  href,
  count,
  external = false,
  showLink = true,
}: {
  title: string
  href: string
  count?: number
  external?: boolean
  showLink?: boolean
}) {
  const content = (
    <div className="mb-6 flex items-start justify-between gap-6">
      <div>
        <h2 className="text-4xl font-bold tracking-tight text-foreground">
          {title}
          {typeof count === "number" ? (
            <sup className="ml-1 align-super text-base leading-none font-normal text-muted">
              {count}
            </sup>
          ) : null}
        </h2>
      </div>
      {showLink ? (
        <span className="shrink-0 self-end text-sm text-muted transition-colors hover:text-foreground">
          {external ? "View on GitHub →" : "View all →"}
        </span>
      ) : null}
    </div>
  )

  if (!showLink) {
    return content
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block">
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  )
}

export async function generateMetadata() {
  return buildMetadata({
    title: "Home",
    path: "/",
  })
}

export default async function HomePage() {
  const [repos, posts] = await Promise.all([getPinnedRepos(), getAllPosts()])

  return (
    <main className="pb-24">
      <div className="pt-20 [&>section]:pt-0 [&>section]:pb-0 [&>section]:md:pt-0">
        <Hero />
      </div>

      <SectionReveal className="mx-auto mt-24 w-full max-w-[900px] px-4 md:px-6">
        <About />
      </SectionReveal>

      <SectionReveal className="mx-auto mt-24 w-full max-w-[900px] px-4 md:px-6">
        <TechStack />
      </SectionReveal>

      {experiences.length > 0 ? (
        <SectionReveal className="mx-auto mt-24 w-full max-w-[900px] px-4 md:px-6">
          <HomeSectionHeader
            title="Experience"
            href="/"
            showLink={false}
          />
          <Experience />
        </SectionReveal>
      ) : null}

      <SectionReveal
        className={`mx-auto mt-24 w-full max-w-[900px] px-4 md:px-6`}
      >
        <HomeSectionHeader
          title="Projects"
          count={repos.length}
          href="/projects"
          showLink={false}
        />
        <FeaturedProjects repos={repos.slice(0, 4)} />
      </SectionReveal>

      <SectionReveal className="mx-auto mt-24 w-full max-w-[900px] px-4 md:px-6">
        <HomeSectionHeader
          title="Blog"
          count={posts.length}
          href="/blog"
          showLink={false}
        />
        <LatestPosts posts={posts.slice(0, 4)} />
      </SectionReveal>

      <SectionReveal className="mx-auto mt-24 w-full max-w-[900px] px-4 md:px-6">
        <HomeSectionHeader
          title="GitHub"
          href={githubSectionLink}
          external
        />
        <Suspense fallback={<GitHubGraphFallback />}>
          <GitHubGraph />
        </Suspense>
      </SectionReveal>

      <SectionReveal className="mx-auto mt-14 w-full max-w-[900px] px-4 md:px-6">
        <Interests />
      </SectionReveal>
    </main>
  )
}
