import { unstable_cache } from "next/cache"

import { SOURCE_CODE_GITHUB_REPO } from "@/config/site"

import { GitHubStars } from "./GitHubStars"

const getStargazerCount = unstable_cache(
  async () => {
    try {
      const token = process.env.STAR_GITHUB_API_TOKEN
      const response = await fetch(
        `https://api.github.com/repos/${SOURCE_CODE_GITHUB_REPO}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          next: {
            revalidate: 86400,
          },
        }
      )

      if (!response.ok) {
        return 0
      }

      const payload = (await response.json()) as { stargazers_count?: number }
      return Number(payload.stargazers_count) || 0
    } catch {
      return 0
    }
  },
  ["github-stargazer-count-v2"],
  {
    revalidate: 86400,
  }
)

export async function NavItemGitHub() {
  const stargazersCount = await getStargazerCount()

  return (
    <GitHubStars
      repo={SOURCE_CODE_GITHUB_REPO}
      stargazersCount={stargazersCount}
    />
  )
}
