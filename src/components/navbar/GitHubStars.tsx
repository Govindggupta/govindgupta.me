import { UTM_PARAMS } from "@/config/site"
import { GitHubIcon } from "@/components/ui/GitHubIcon"
import { Tooltip } from "@/components/ui/Tooltip"
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

export function GitHubStars({ repo, stargazersCount }: GitHubStarsProps) {
  const hasStarCount = typeof stargazersCount === "number" && stargazersCount > 0
  const starsCompact = hasStarCount
    ? compactFormatter.format(stargazersCount).toLowerCase()
    : null
  const starsFull = hasStarCount
    ? fullFormatter.format(stargazersCount)
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
        <Tooltip
          side="bottom"
          className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          {starsFull} stars
        </Tooltip>
      ) : null}
    </div>
  )
}
