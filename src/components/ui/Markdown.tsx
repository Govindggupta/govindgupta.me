import "server-only"

import {
  createElement,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
} from "react"

import type { MDXComponents } from "mdx/types"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

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

function normalizeMarkdownListIndentation(source: string) {
  const lines = source.split("\n")
  const indentedListLines = lines
    .map((line) => {
      const match = line.match(/^(\s+)([-*+]|\d+\.)\s+/)

      return match ? match[1].length : 0
    })
    .filter((indent) => indent > 0)

  const baseIndent = indentedListLines.length
    ? Math.min(...indentedListLines)
    : null

  if (!baseIndent) {
    return source
  }

  return lines
    .map((line) => {
      const match = line.match(/^(\s+)((?:[-*+])|(?:\d+\.))(\s+.*)$/)

      if (!match) {
        return line
      }

      const indent = match[1].length
      const level = Math.max(1, Math.round(indent / baseIndent))

      return `${"  ".repeat(level)}${match[2]}${match[3]}`
    })
    .join("\n")
}

const markdownComponents: MDXComponents = {
  p: (props: ComponentPropsWithoutRef<"p">) =>
    createElement(
      "p",
      withClassName(
        props,
        "text-[15px] leading-relaxed text-foreground/90 sm:text-base"
      )
    ),
  ul: (props: ComponentPropsWithoutRef<"ul">) =>
    createElement(
      "ul",
      withClassName(props, "list-none space-y-3 pl-0")
    ),
  ol: (props: ComponentPropsWithoutRef<"ol">) =>
    createElement(
      "ol",
      withClassName(props, "list-none space-y-3 pl-0")
    ),
  li: (props: ComponentPropsWithoutRef<"li">) =>
    createElement(
      "li",
      withClassName(
        props,
        "relative pl-5 text-[15px] leading-relaxed text-foreground/90 before:absolute before:top-[0.62em] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-foreground/45 sm:text-base [&>ul]:mt-2 [&>ul]:space-y-2 [&>ul]:pl-2 [&>ol]:mt-2 [&>ol]:space-y-2 [&>ol]:pl-2"
      )
    ),
  a: (props: ComponentPropsWithoutRef<"a">) =>
    createElement("a", {
      ...withClassName(
        props,
        "underline decoration-current underline-offset-4 transition-opacity duration-200 hover:opacity-60"
      ),
      target:
        typeof props.href === "string" && props.href.startsWith("http")
          ? "_blank"
          : props.target,
      rel:
        typeof props.href === "string" && props.href.startsWith("http")
          ? "nofollow noopener noreferrer"
          : props.rel,
    }),
  strong: (props: ComponentPropsWithoutRef<"strong">) =>
    createElement("strong", withClassName(props, "font-medium text-foreground")),
  em: (props: ComponentPropsWithoutRef<"em">) =>
    createElement("em", withClassName(props, "italic text-foreground/80")),
  code: (props: ComponentPropsWithoutRef<"code">) =>
    createElement(
      "code",
      withClassName(
        props,
        "rounded-sm bg-background-alt px-1.5 py-0.5 text-[0.95em] text-foreground/90"
      )
    ),
}

export async function Markdown({
  source,
}: Readonly<{
  source: string
}>) {
  const { content } = await compileMDX({
    source: normalizeMarkdownListIndentation(source),
    components: markdownComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  })

  return content
}
