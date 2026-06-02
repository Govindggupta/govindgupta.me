export const HOME_SECTIONS = {
  HERO: "hello",
  ABOUT: "about",
  TECH_STACK: "stack",
  EXPERIENCE: "experience",
  PROJECTS: "projects",
  BLOG: "blog",
  GITHUB: "github",
} as const

export type HomeSection = (typeof HOME_SECTIONS)[keyof typeof HOME_SECTIONS]
