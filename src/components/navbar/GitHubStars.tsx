import { UTM_PARAMS } from "@/config/site"
import { GitHubIcon } from "@/components/ui/GitHubIcon"
import { addQueryParams } from "@/utils/url"

type GitHubStarsProps = {
  repo: string
  stargazersCount: number
}

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
})

const fullFormatter = new Intl.NumberFormat("en-US")

export function GitHubStars({ repo, stargazersCount }: GitHubStarsProps) {
  const starsCompact = compactFormatter.format(stargazersCount).toLowerCase()
  const starsFull = fullFormatter.format(stargazersCount)
  const githubRepoUrl = addQueryParams(`https://github.com/${repo}`, UTM_PARAMS)

  return (
    <div className="group relative">
      <a
        href={githubRepoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${starsFull} GitHub stars`}
        className="flex h-9 items-center gap-1.5 rounded-xl bg-transparent pr-1.5 pl-2 text-muted transition-all duration-200 ease-out hover:bg-background-alt/80 hover:text-foreground hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_8px_rgba(0,0,0,0.08)] focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_2px_10px_rgba(0,0,0,0.32)]"
      >
        <GitHubIcon className="h-4 w-4 -translate-y-px text-foreground" />
        <span className="text-sm font-medium tabular-nums">
          {starsCompact}
        </span>
      </a>

      <div
        role="tooltip"
        className="pointer-events-none absolute top-full left-1/2 z-20 mt-2 -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      >
        <span className="relative inline-flex items-center rounded-[0.9rem] border border-white/10 bg-neutral-950 px-3.5 py-2.5 text-[13px] leading-none font-medium text-white dark:border-black/10 dark:bg-white dark:text-neutral-900">
          {starsFull} stars
          <span className="absolute bottom-full left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1 rotate-45 border-l border-t border-white/10 bg-neutral-950 dark:border-black/10 dark:bg-white" />
        </span>
      </div>
    </div>
  )
}
