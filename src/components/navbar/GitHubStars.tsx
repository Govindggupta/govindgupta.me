"use client"

import { useEffect, useState } from "react"

import { UTM_PARAMS } from "@/config/site"
import { GitHubIcon } from "@/components/ui/GitHubIcon"
import { addQueryParams } from "@/utils/url"

type GitHubStarsProps = {
  repo: string
  stargazersCount: number | null
}

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
})

const fullFormatter = new Intl.NumberFormat("en-US")
const GITHUB_REPO_API_URL = "https://api.github.com/repos"
const STAR_COUNT_REFRESH_INTERVAL_MS = 5 * 60 * 1000

async function fetchStargazerCount(repo: string, signal?: AbortSignal) {
  const response = await fetch(`${GITHUB_REPO_API_URL}/${repo}`, {
    cache: "no-store",
    signal,
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })

  if (!response.ok) {
    return null
  }

  const payload = (await response.json()) as { stargazers_count?: number }
  const stargazersCount = Number(payload.stargazers_count)

  return Number.isFinite(stargazersCount) ? stargazersCount : null
}

export function GitHubStars({ repo, stargazersCount }: GitHubStarsProps) {
  const [liveStargazersCount, setLiveStargazersCount] =
    useState<number | null>(stargazersCount)

  useEffect(() => {
    setLiveStargazersCount(stargazersCount)
  }, [stargazersCount])

  useEffect(() => {
    let isDisposed = false
    let currentController: AbortController | null = null

    const refreshStargazerCount = async () => {
      currentController?.abort()
      const controller = new AbortController()
      currentController = controller

      try {
        const nextStargazersCount = await fetchStargazerCount(
          repo,
          controller.signal
        )

        if (!isDisposed && typeof nextStargazersCount === "number") {
          setLiveStargazersCount((currentCount) =>
            currentCount === nextStargazersCount
              ? currentCount
              : nextStargazersCount
          )
        }
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return
        }
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void refreshStargazerCount()
      }
    }

    void refreshStargazerCount()

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void refreshStargazerCount()
      }
    }, STAR_COUNT_REFRESH_INTERVAL_MS)

    window.addEventListener("focus", handleVisibilityChange)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      isDisposed = true
      currentController?.abort()
      window.clearInterval(intervalId)
      window.removeEventListener("focus", handleVisibilityChange)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [repo])

  const hasStarCount =
    typeof liveStargazersCount === "number" && liveStargazersCount > 0
  const starsCompact = hasStarCount
    ? compactFormatter.format(liveStargazersCount).toLowerCase()
    : null
  const starsFull = hasStarCount
    ? fullFormatter.format(liveStargazersCount)
    : null
  const githubRepoUrl = addQueryParams(`https://github.com/${repo}`, UTM_PARAMS)

  return (
    <div className="group relative">
      <a
        href={githubRepoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={hasStarCount ? `${starsFull} GitHub stars` : "View on GitHub"}
        className="flex h-8 items-center gap-1.5 rounded-xl bg-transparent px-2 text-muted transition-colors duration-200 ease-out hover:bg-background-alt active:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none dark:hover:bg-white/10 dark:active:bg-white/14"
      >
        <GitHubIcon className="h-4 w-4 -translate-y-px text-foreground" />
        {hasStarCount ? (
          <span className="text-sm font-medium tabular-nums">
            {starsCompact}
          </span>
        ) : null}
      </a>

      {hasStarCount ? (
        <div
          role="tooltip"
          className="pointer-events-none absolute top-full left-1/2 z-20 mt-2 -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        >
          <span className="relative inline-flex items-center rounded-[0.9rem] border border-white/10 bg-neutral-950 px-3.5 py-2.5 text-[13px] leading-none font-medium text-white dark:border-black/10 dark:bg-white dark:text-neutral-900">
            {starsFull} stars
            <span className="absolute bottom-full left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1 rotate-45 border-l border-t border-white/10 bg-neutral-950 dark:border-black/10 dark:bg-white" />
          </span>
        </div>
      ) : null}
    </div>
  )
}
