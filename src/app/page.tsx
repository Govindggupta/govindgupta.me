import { Suspense } from "react"

import {
  GitHubGraph,
  GitHubGraphFallback,
} from "@/components/sections/GitHubGraph"
import { FeaturedProjects } from "@/components/sections/FeaturedProjects"
import { Hero } from "@/components/sections/Hero"
import { LatestPosts } from "@/components/sections/LatestPosts"
import { SectionReveal } from "@/components/ui/SectionReveal"
import { buildMetadata } from "@/lib/metadata"

export async function generateMetadata() {
  return buildMetadata({
    title: "Home",
    path: "/",
  })
}

export default function HomePage() {
  return (
    <main className="pb-20 sm:pb-24">
      <Hero />

      <SectionReveal className="mx-auto w-full max-w-[900px] px-4 py-16 md:px-6">
        <FeaturedProjects />
      </SectionReveal>

      <SectionReveal className="mx-auto w-full max-w-[900px] px-4 py-16 md:px-6">
        <LatestPosts />
      </SectionReveal>

      <SectionReveal className="mx-auto w-full max-w-[900px] px-4 py-16 md:px-6">
        <Suspense fallback={<GitHubGraphFallback />}>
          <GitHubGraph />
        </Suspense>
      </SectionReveal>
    </main>
  )
}
