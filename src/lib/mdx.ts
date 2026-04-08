import "server-only"

import { readFile, readdir } from "node:fs/promises"
import path from "node:path"
import {
  createElement,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
} from "react"

import matter from "gray-matter"
import type { MDXComponents } from "mdx/types"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

import type { BlogPost, BlogPostFrontmatter, BlogPostSummary } from "@/types"
import { estimateReadTime } from "@/lib/read-time"

const BLOG_DIRECTORY = path.join(process.cwd(), "src", "content", "blog")

function mergeClassName(
  propsClassName: string | undefined,
  defaultClassName: string
) {
  return [defaultClassName, propsClassName].filter(Boolean).join(" ")
}

function withClassName<T extends HTMLAttributes<HTMLElement>>(
  props: T,
  className: string
) {
  return {
    ...props,
    className: mergeClassName(props.className, className),
  }
}

const mdxComponents: MDXComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) =>
    createElement(
      "h1",
      withClassName(
        props,
        "font-heading text-step-4 tracking-tight text-foreground"
      )
    ),
  h2: (props: ComponentPropsWithoutRef<"h2">) =>
    createElement(
      "h2",
      withClassName(
        props,
        "font-heading text-step-3 tracking-tight text-foreground"
      )
    ),
  p: (props: ComponentPropsWithoutRef<"p">) =>
    createElement(
      "p",
      withClassName(props, "text-step-0 text-foreground-soft")
    ),
  a: (props: ComponentPropsWithoutRef<"a">) =>
    createElement(
      "a",
      withClassName(
        props,
        "underline decoration-border underline-offset-4 transition-opacity duration-200 hover:opacity-60"
      )
    ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) =>
    createElement(
      "blockquote",
      withClassName(props, "border-l border-border pl-5 text-foreground-soft")
    ),
  pre: (props: ComponentPropsWithoutRef<"pre">) =>
    createElement(
      "pre",
      withClassName(
        props,
        "overflow-x-auto border border-border bg-background-alt p-4 text-sm text-foreground-soft"
      )
    ),
  code: (props: ComponentPropsWithoutRef<"code">) =>
    createElement(
      "code",
      withClassName(
        props,
        "rounded-sm bg-background-alt px-1.5 py-0.5 text-[0.95em] text-foreground-soft"
      )
    ),
}

function toPostSlug(fileName: string) {
  return fileName.replace(/\.mdx$/, "")
}

function parseFrontmatter(data: Record<string, unknown>, slug: string) {
  const { title, date, description, tags, cover } = data

  if (
    typeof title !== "string" ||
    typeof date !== "string" ||
    typeof description !== "string" ||
    !Array.isArray(tags) ||
    !tags.every((tag) => typeof tag === "string") ||
    (cover !== undefined && typeof cover !== "string")
  ) {
    throw new Error(`Invalid frontmatter for blog post "${slug}".`)
  }

  const frontmatter: BlogPostFrontmatter = {
    title,
    date,
    description,
    tags,
    cover,
  }

  return frontmatter
}

async function readPostSource(slug: string) {
  const filePath = path.join(BLOG_DIRECTORY, `${slug}.mdx`)
  const source = await readFile(filePath, "utf8")
  const { content, data } = matter(source)

  return {
    content,
    frontmatter: parseFrontmatter(data, slug),
  }
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}

export async function getBlogSlugs() {
  const entries = await readdir(BLOG_DIRECTORY)

  return entries.filter((entry) => entry.endsWith(".mdx")).map(toPostSlug)
}

export async function getAllPosts(): Promise<BlogPostSummary[]> {
  const slugs = await getBlogSlugs()
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { content, frontmatter } = await readPostSource(slug)
      const readTime = estimateReadTime(content)

      return {
        slug,
        ...frontmatter,
        ...readTime,
      }
    })
  )

  return posts.sort(
    (left, right) =>
      new Date(right.date).getTime() - new Date(left.date).getTime()
  )
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { content, frontmatter } = await readPostSource(slug)
    const readTime = estimateReadTime(content)
    const { content: compiledContent } = await compileMDX({
      source: content,
      components: mdxComponents,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    })

    return {
      slug,
      content: compiledContent,
      ...frontmatter,
      ...readTime,
    }
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null
    }

    throw error
  }
}
