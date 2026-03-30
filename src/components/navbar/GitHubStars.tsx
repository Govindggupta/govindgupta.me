import { UTM_PARAMS } from "@/config/site"
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
        <svg
          className="h-4 w-4 -translate-y-px text-foreground"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            fill="currentColor"
          />
        </svg>
        <span className="text-sm font-medium tabular-nums">
          {starsCompact}
        </span>
      </a>

      <div
        role="tooltip"
        className="pointer-events-none absolute top-full left-1/2 z-20 mt-2 -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        <span className="relative inline-flex items-center rounded-[0.9rem] border border-white/10 bg-neutral-950 px-3.5 py-2.5 text-[13px] leading-none font-medium text-white dark:border-black/10 dark:bg-white dark:text-neutral-900">
          {starsFull} stars
          <span className="absolute bottom-full left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1 rotate-45 border-l border-t border-white/10 bg-neutral-950 dark:border-black/10 dark:bg-white" />
        </span>
      </div>
    </div>
  )
}
