import type { Project } from "@/types"

export const projects: Project[] = [
  {
    name: "Signal Board",
    description:
      "A product analytics dashboard for revenue teams with event streams, saved filters, and weekly reporting digests.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Charts"],
    githubUrl: "https://github.com/govindggupta/signal-board",
    liveUrl: "https://signal-board-demo.vercel.app",
  },
  {
    name: "Draftbase",
    description:
      "An MDX-first publishing workspace that lets small teams ship changelogs, notes, and docs from one interface.",
    tags: ["App Router", "MDX", "Tailwind", "Content"],
    githubUrl: "https://github.com/govindggupta/draftbase",
    liveUrl: "https://draftbase-demo.vercel.app",
  },
  {
    name: "Ops Ledger",
    description:
      "A calm internal tool for approvals, queue management, and audit trails across support and operations workflows.",
    tags: ["React", "Node.js", "Prisma", "Automation"],
    githubUrl: "https://github.com/govindggupta/ops-ledger",
    liveUrl: "https://ops-ledger-demo.vercel.app",
  },
]
