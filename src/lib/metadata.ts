import type { Metadata } from "next"

import type { PageMetadataInput } from "@/types"

export const siteConfig = {
  name: "Govind Gupta",
  title: "Govind Gupta | Full Stack Developer",
  description:
    "Minimal monochrome portfolio for Govind Gupta, a full stack developer building sharp, reliable products for the web.",
  url: "https://govindgupta.me",
} as const

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  type = "website",
  publishedTime,
  tags,
}: PageMetadataInput = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title
  const pageUrl = new URL(path, siteConfig.url).toString()

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: pageUrl,
      siteName: siteConfig.name,
      type,
      publishedTime,
      tags,
    },
  }
}
