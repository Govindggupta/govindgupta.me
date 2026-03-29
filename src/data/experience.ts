export interface Experience {
  company: string
  role: string
  duration: string
  location: string
  description: string[]
  tech: string[]
  type?: "full-time" | "part-time" | "internship" | "freelance"
  url?: string
  logo?: string
  current?: boolean
}

export const experiences: Experience[] = [
  {
    company: "Northstar Labs",
    logo: "/logos/companies/northstar-labs.svg",
    role: "Full Stack Developer Intern",
    duration: "Jan 2026 – Present",
    location: "Remote",
    type: "internship",
    current: true,
    description: [
      "Built internal product workflows with Next.js and TypeScript for faster team operations.",
      "Implemented reusable UI patterns and API integrations across dashboard surfaces.",
      "Collaborated on performance fixes and deployment improvements for client-facing features.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    url: "https://example.com",
  },
  {
    company: "Pixel Foundry",
    logo: "/logos/companies/pixel-foundry.svg",
    role: "Freelance Frontend Developer",
    duration: "May 2025 – Dec 2025",
    location: "Surat, India",
    type: "freelance",
    description: [
      "Delivered responsive marketing sites and portfolio builds for early-stage founders.",
      "Translated Figma concepts into production-ready React interfaces with clean component structure.",
      "Improved Lighthouse scores through asset optimization, lazy loading, and layout refinements.",
    ],
    tech: ["React", "Next.js", "Framer Motion", "Vercel"],
    url: "https://example.com",
  },
  {
    company: "Data Harbor",
    logo: "/logos/companies/data-harbor.svg",
    role: "Backend Developer Intern",
    duration: "Sep 2024 – Apr 2025",
    location: "Hybrid",
    type: "internship",
    description: [
      "Worked on Node.js services for authentication, data sync, and reporting pipelines.",
      "Designed database queries and schemas for internal analytics dashboards.",
      "Wrote API documentation and assisted with testing across staging environments.",
    ],
    tech: ["Node.js", "Express", "MongoDB", "Docker"],
    url: "https://example.com",
  },
]