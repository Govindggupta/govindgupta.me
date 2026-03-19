import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

export interface SocialLink {
  label: string
  href: string
  icon: LucideIcon
}

export interface Project {
  name: string
  description: string
  tags: string[]
  githubUrl: string
  liveUrl: string
}

export interface PinnedRepo {
  name: string
  description: string | null
  url: string
  homepageUrl: string | null
  stargazerCount: number
  forkCount: number
  language: string | null
  topics: string[]
}

export interface BlogPostFrontmatter {
  title: string
  date: string
  description: string
  tags: string[]
}

export interface BlogPostSummary extends BlogPostFrontmatter {
  slug: string
}

export interface BlogPost extends BlogPostSummary {
  content: ReactNode
}

export interface PageMetadataInput {
  title?: string
  description?: string
  path?: string
  type?: "website" | "article"
  publishedTime?: string
  tags?: string[]
}
