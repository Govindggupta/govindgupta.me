export interface Experience {
  company: string
  role: string
  duration: string
  location: string
  type: "full-time" | "part-time" | "internship" | "freelance"
  description: string[]
  tech: string[]
  url?: string
  current?: boolean
}

export const experiences: Experience[] = []
