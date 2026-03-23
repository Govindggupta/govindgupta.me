import "server-only"

import type { PinnedRepo } from "@/types"

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql"
const GITHUB_PUBLIC_CONTRIBUTIONS_ENDPOINT = "https://github.com/users"
const GITHUB_CONTRIBUTIONS_API_ENDPOINT =
  "https://github-contributions-api.jogruber.de/v4"
const GITHUB_USERNAME = "govindggupta"
const CONTRIBUTION_WEEKS = 52
const DAYS_PER_WEEK = 7
const CONTRIBUTION_DAYS = CONTRIBUTION_WEEKS * DAYS_PER_WEEK

const contributionQuery = `
  query {
    user(login: "govindggupta") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`

const pinnedReposQuery = `
  query {
    user(login: "govindggupta") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            primaryLanguage {
              name
            }
            repositoryTopics(first: 4) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`

export type GitHubContributionLevel = 0 | 1 | 2 | 3 | 4

export interface GitHubContributionDay {
  date: string
  contributionCount: number
  contributionLevel: GitHubContributionLevel
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[]
}

export interface GitHubContributionCalendar {
  totalContributions: number
  weeks: GitHubContributionWeek[]
}

export interface GitHubProfile {
  avatar_url: string
  name: string | null
  bio: string | null
  login: string
}

interface GitHubGraphQLContributionDay {
  date: string
  contributionCount: number
}

interface GitHubGraphQLContributionWeek {
  contributionDays: GitHubGraphQLContributionDay[]
}

interface GitHubGraphQLContributionCalendar {
  totalContributions: number
  weeks: GitHubGraphQLContributionWeek[]
}

interface GitHubGraphQLResponse {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: GitHubGraphQLContributionCalendar
      }
    } | null
  }
  errors?: Array<{
    message: string
  }>
}

interface GitHubContributionsApiResponse {
  contributions?: Array<{
    date: string
    count: number
    level: GitHubContributionLevel
  }>
  error?: string
}

interface GitHubPinnedRepoNode {
  name: string
  description: string | null
  url: string
  homepageUrl: string | null
  stargazerCount: number
  forkCount: number
  primaryLanguage: {
    name: string
  } | null
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string
      }
    }>
  }
}

interface GitHubPinnedReposResponse {
  data?: {
    user: {
      pinnedItems: {
        nodes: GitHubPinnedRepoNode[]
      }
    } | null
  }
  errors?: Array<{
    message: string
  }>
}

interface GitHubPublicRepoResponse {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics?: string[]
}

export const githubProfileUrl = `https://github.com/${GITHUB_USERNAME}`
const githubProfileApiUrl = `https://api.github.com/users/${GITHUB_USERNAME}`
const githubRepoApiUrl = "https://api.github.com/repos"

function formatRequestDate(date: Date) {
  const year = date.getUTCFullYear()
  const month = `${date.getUTCMonth() + 1}`.padStart(2, "0")
  const day = `${date.getUTCDate()}`.padStart(2, "0")

  return `${year}-${month}-${day}`
}

function buildWeeks(days: GitHubContributionDay[]) {
  return Array.from({ length: CONTRIBUTION_WEEKS }, (_, index) => ({
    contributionDays: days.slice(
      index * DAYS_PER_WEEK,
      index * DAYS_PER_WEEK + DAYS_PER_WEEK
    ),
  }))
}

function clampContributionLevel(level: number): GitHubContributionLevel {
  if (level <= 0) {
    return 0
  }

  if (level >= 4) {
    return 4
  }

  return level as GitHubContributionLevel
}

function deriveContributionLevel(
  contributionCount: number,
  maxContributionCount: number
): GitHubContributionLevel {
  if (contributionCount === 0 || maxContributionCount <= 0) {
    return 0
  }

  return clampContributionLevel(
    Math.ceil((contributionCount / maxContributionCount) * 4)
  )
}

function withDerivedContributionLevels(
  days: Array<{
    date: string
    contributionCount: number
  }>
): GitHubContributionDay[] {
  const maxContributionCount = days.reduce(
    (maxCount, day) => Math.max(maxCount, day.contributionCount),
    0
  )

  return days.map((day) => ({
    date: day.date,
    contributionCount: day.contributionCount,
    contributionLevel: deriveContributionLevel(
      day.contributionCount,
      maxContributionCount
    ),
  }))
}

function parseContributionCount(tooltip: string) {
  if (tooltip.startsWith("No contributions")) {
    return 0
  }

  const match = tooltip.match(/(?<count>\d+)\s+contributions?\s+on/i)

  if (!match?.groups?.count) {
    return null
  }

  return Number(match.groups.count)
}

function parseContributionDays(markup: string) {
  const dayPattern =
    /<td[^>]*data-date="(?<date>\d{4}-\d{2}-\d{2})"[^>]*><\/td>\s*<tool-tip[^>]*>(?<tooltip>[^<]+)<\/tool-tip>/g

  return Array.from(markup.matchAll(dayPattern))
    .map((match) => {
      const date = match.groups?.date
      const tooltip = match.groups?.tooltip?.trim()

      if (!date || !tooltip) {
        return null
      }

      const contributionCount = parseContributionCount(tooltip)

      if (contributionCount === null) {
        return null
      }

      const levelMatch = match[0].match(/data-level="(?<level>\d+)"/)
      const contributionLevel = clampContributionLevel(
        Number(levelMatch?.groups?.level ?? 0)
      )

      return {
        date,
        contributionCount,
        contributionLevel,
      }
    })
    .filter((day): day is GitHubContributionDay => day !== null)
}

async function fetchContributionApiCalendar(): Promise<GitHubContributionCalendar | null> {
  const contributionsUrl = new URL(
    `${GITHUB_CONTRIBUTIONS_API_ENDPOINT}/${GITHUB_USERNAME}`
  )
  contributionsUrl.searchParams.set("y", "last")

  const response = await fetch(contributionsUrl, {
    headers: {
      Accept: "application/json",
      "User-Agent": "govindgupta.me",
    },
    next: {
      revalidate: 3600,
    },
  })

  if (!response.ok) {
    return null
  }

  const payload = (await response.json()) as GitHubContributionsApiResponse

  if (payload.error || !payload.contributions?.length) {
    return null
  }

  const days = payload.contributions
    .map((day) => ({
      date: day.date,
      contributionCount: day.count,
      contributionLevel: clampContributionLevel(day.level),
    }))
    .sort((left, right) => left.date.localeCompare(right.date))
    .slice(-CONTRIBUTION_DAYS)

  if (days.length === 0) {
    return null
  }

  return {
    totalContributions: days.reduce(
      (sum, day) => sum + day.contributionCount,
      0
    ),
    weeks: buildWeeks(days),
  }
}

async function fetchGraphQLContributionCalendar(
  token: string
): Promise<GitHubContributionCalendar | null> {
  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: contributionQuery,
    }),
    next: {
      revalidate: 3600,
    },
  })

  if (!response.ok) {
    return null
  }

  const payload = (await response.json()) as GitHubGraphQLResponse

  if (payload.errors?.length || !payload.data?.user) {
    return null
  }

  const calendar =
    payload.data.user.contributionsCollection.contributionCalendar
  const days = withDerivedContributionLevels(
    calendar.weeks
      .slice(-CONTRIBUTION_WEEKS)
      .flatMap((week) => week.contributionDays)
  )

  return {
    totalContributions: calendar.totalContributions,
    weeks: buildWeeks(days),
  }
}

async function fetchPublicContributionYear(
  year: number
): Promise<GitHubContributionDay[] | null> {
  const contributionsUrl = new URL(
    `${GITHUB_PUBLIC_CONTRIBUTIONS_ENDPOINT}/${GITHUB_USERNAME}/contributions`
  )
  contributionsUrl.searchParams.set("from", `${year}-01-01`)
  contributionsUrl.searchParams.set("to", `${year}-12-31`)

  const response = await fetch(contributionsUrl, {
    headers: {
      Accept: "text/html",
      "User-Agent": "govindgupta.me",
    },
    next: {
      revalidate: 3600,
    },
  })

  if (!response.ok) {
    return null
  }

  const markup = await response.text()
  const days = parseContributionDays(markup)

  if (days.length === 0) {
    return null
  }

  return days
}

async function fetchPublicContributionCalendar(): Promise<GitHubContributionCalendar | null> {
  const endDate = new Date()
  endDate.setUTCHours(0, 0, 0, 0)

  const startDate = new Date(endDate)
  startDate.setUTCDate(endDate.getUTCDate() - (CONTRIBUTION_DAYS - 1))

  const years = Array.from(
    new Set([startDate.getUTCFullYear(), endDate.getUTCFullYear()])
  )

  const yearResults = await Promise.all(
    years.map((year) => fetchPublicContributionYear(year))
  )

  if (yearResults.some((result) => result === null)) {
    return null
  }

  const contributionYears = yearResults.filter(
    (result): result is GitHubContributionDay[] => result !== null
  )

  const startDateString = formatRequestDate(startDate)
  const endDateString = formatRequestDate(endDate)
  const days = contributionYears
    .flat()
    .filter((day) => day.date >= startDateString && day.date <= endDateString)
    .sort((left, right) => left.date.localeCompare(right.date))

  if (days.length === 0) {
    return null
  }

  const totalContributions = days.reduce(
    (sum, day) => sum + day.contributionCount,
    0
  )

  return {
    totalContributions,
    weeks: buildWeeks(days),
  }
}

export async function getGitHubContributionCalendar(): Promise<GitHubContributionCalendar | null> {
  try {
    const apiCalendar = await fetchContributionApiCalendar()

    if (apiCalendar) {
      return apiCalendar
    }
  } catch {
    // Fall through to the GitHub-backed fallbacks when the public API is unavailable.
  }

  const token = process.env.GITHUB_TOKEN

  if (token) {
    try {
      const graphQLCalendar = await fetchGraphQLContributionCalendar(token)

      if (graphQLCalendar) {
        return graphQLCalendar
      }
    } catch {
      // Fall through to the public contributions page when GraphQL is unavailable.
    }
  }

  try {
    return await fetchPublicContributionCalendar()
  } catch {
    return null
  }
}

export async function getGitHubProfile(): Promise<GitHubProfile> {
  const token = process.env.GITHUB_TOKEN

  try {
    const response = await fetch(githubProfileApiUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: {
        revalidate: 3600,
      },
    })

    if (!response.ok) {
      throw new Error("Unable to load GitHub profile")
    }

    const payload = (await response.json()) as Partial<GitHubProfile>

    return {
      avatar_url: payload.avatar_url ?? `${githubProfileUrl}.png`,
      name: payload.name ?? null,
      bio: payload.bio ?? null,
      login: payload.login ?? GITHUB_USERNAME,
    }
  } catch {
    return {
      avatar_url: `${githubProfileUrl}.png`,
      name: "Govind Gupta",
      bio: null,
      login: GITHUB_USERNAME,
    }
  }
}

export async function getPinnedRepos(): Promise<PinnedRepo[]> {
  const token = process.env.GITHUB_TOKEN

  try {
    if (token) {
      const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: pinnedReposQuery,
        }),
        next: {
          revalidate: 3600,
        },
      })

      if (response.ok) {
        const payload = (await response.json()) as GitHubPinnedReposResponse

        if (!payload.errors?.length && payload.data?.user) {
          const repos = payload.data.user.pinnedItems.nodes.map((repo) => ({
            name: repo.name,
            description: repo.description,
            url: repo.url,
            homepageUrl: repo.homepageUrl,
            stargazerCount: repo.stargazerCount,
            forkCount: repo.forkCount,
            language: repo.primaryLanguage?.name ?? null,
            topics: repo.repositoryTopics.nodes.map((node) => node.topic.name),
          }))

          if (repos.length > 0) {
            return repos
          }
        }
      }
    }

    const profileResponse = await fetch(githubProfileUrl, {
      headers: {
        Accept: "text/html",
        "User-Agent": "govindgupta.me",
      },
      next: {
        revalidate: 3600,
      },
    })

    if (!profileResponse.ok) {
      return []
    }

    const profileMarkup = await profileResponse.text()
    const pinnedSectionMatch = profileMarkup.match(
      /<div class="js-pinned-items-reorder-container">[\s\S]*?<\/ol>/
    )

    if (!pinnedSectionMatch) {
      return []
    }

    const pinnedRepoMatches = Array.from(
      pinnedSectionMatch[0].matchAll(
        /<a[^>]*href="\/(?<owner>[^/"]+)\/(?<repo>[^/"]+)"[^>]*class="[^"]*text-bold wb-break-word[^"]*"/g
      )
    )

    const pinnedRepoRefs = pinnedRepoMatches
      .map((match) => {
        const owner = match.groups?.owner
        const repo = match.groups?.repo

        if (!owner || !repo) {
          return null
        }

        return {
          owner,
          repo,
        }
      })
      .filter(
        (
          repoRef
        ): repoRef is {
          owner: string
          repo: string
        } => repoRef !== null
      )
      .filter(
        (repoRef, index, repoRefs) =>
          repoRefs.findIndex(
            (candidate) =>
              candidate.owner === repoRef.owner &&
              candidate.repo === repoRef.repo
          ) === index
      )
      .slice(0, 6)

    if (pinnedRepoRefs.length === 0) {
      return []
    }

    const repos = await Promise.all(
      pinnedRepoRefs.map(async ({ owner, repo }) => {
        const repoResponse = await fetch(
          `${githubRepoApiUrl}/${owner}/${repo}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              "X-GitHub-Api-Version": "2022-11-28",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            next: {
              revalidate: 3600,
            },
          }
        )

        if (!repoResponse.ok) {
          return null
        }

        const repoPayload =
          (await repoResponse.json()) as GitHubPublicRepoResponse

        return {
          name: repoPayload.name,
          description: repoPayload.description,
          url: repoPayload.html_url,
          homepageUrl:
            repoPayload.homepage && repoPayload.homepage.trim().length > 0
              ? repoPayload.homepage
              : null,
          stargazerCount: repoPayload.stargazers_count,
          forkCount: repoPayload.forks_count,
          language: repoPayload.language,
          topics: repoPayload.topics?.slice(0, 4) ?? [],
        } satisfies PinnedRepo
      })
    )

    return repos.filter((repo): repo is PinnedRepo => repo !== null)
  } catch {
    return []
  }
}
