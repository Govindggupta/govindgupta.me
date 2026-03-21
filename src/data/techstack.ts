export interface TechItem {
  name: string
  iconDark: string
  iconLight: string
  url?: string
  category:
    | "language"
    | "frontend"
    | "backend"
    | "database"
    | "tools"
    | "ai"
  singleVariant?: boolean
}

const techStack: TechItem[] = [
  {
    name: "HTML",
    iconDark: "/icons/tech/html5.svg",
    iconLight: "/icons/tech/html5.svg",
    url: "https://developer.mozilla.org/docs/Web/HTML",
    category: "language",
    singleVariant: true,
  },
  {
    name: "CSS",
    iconDark: "/icons/tech/css3.svg",
    iconLight: "/icons/tech/css3.svg",
    url: "https://developer.mozilla.org/docs/Web/CSS",
    category: "language",
    singleVariant: true,
  },
  {
    name: "JavaScript",
    iconDark: "/icons/tech/javascript.svg",
    iconLight: "/icons/tech/javascript.svg",
    url: "https://developer.mozilla.org/docs/Web/JavaScript",
    category: "language",
    singleVariant: true,
  },
  {
    name: "TypeScript",
    iconDark: "/icons/tech/typescript.svg",
    iconLight: "/icons/tech/typescript.svg",
    url: "https://www.typescriptlang.org",
    category: "language",
    singleVariant: true,
  },
  {
    name: "Python",
    iconDark: "/icons/tech/python.svg",
    iconLight: "/icons/tech/python.svg",
    url: "https://www.python.org",
    category: "language",
    singleVariant: true,
  },
  {
    name: "Java",
    iconDark: "/icons/tech/java.svg",
    iconLight: "/icons/tech/java.svg",
    url: "https://openjdk.org",
    category: "language",
    singleVariant: true,
  },
  {
    name: "React",
    iconDark: "/icons/tech/react.svg",
    iconLight: "/icons/tech/react.svg",
    url: "https://react.dev",
    category: "frontend",
    singleVariant: true,
  },
  {
    name: "Next.js",
    iconDark: "/icons/tech/nextjs-dark.svg",
    iconLight: "/icons/tech/nextjs-light.svg",
    url: "https://nextjs.org",
    category: "frontend",
    singleVariant: false,
  },
  {
    name: "Tailwind CSS",
    iconDark: "/icons/tech/tailwindcss.svg",
    iconLight: "/icons/tech/tailwindcss.svg",
    url: "https://tailwindcss.com",
    category: "frontend",
    singleVariant: true,
  },
  {
    name: "Node.js",
    iconDark: "/icons/tech/nodejs.svg",
    iconLight: "/icons/tech/nodejs.svg",
    url: "https://nodejs.org",
    category: "backend",
    singleVariant: true,
  },
  {
    name: "Express",
    iconDark: "/icons/tech/express-dark.svg",
    iconLight: "/icons/tech/express-light.svg",
    url: "https://expressjs.com",
    category: "backend",
    singleVariant: false,
  },
  {
    name: "Bun",
    iconDark: "/icons/tech/bun.svg",
    iconLight: "/icons/tech/bun.svg",
    url: "https://bun.sh",
    category: "backend",
    singleVariant: true,
  },
  {
    name: "PostgreSQL",
    iconDark: "/icons/tech/postgresql.svg",
    iconLight: "/icons/tech/postgresql.svg",
    url: "https://www.postgresql.org",
    category: "database",
    singleVariant: true,
  },
  {
    name: "MySQL",
    iconDark: "/icons/tech/mysql.svg",
    iconLight: "/icons/tech/mysql.svg",
    url: "https://www.mysql.com",
    category: "database",
    singleVariant: true,
  },
  {
    name: "MongoDB",
    iconDark: "/icons/tech/mongodb.svg",
    iconLight: "/icons/tech/mongodb.svg",
    url: "https://www.mongodb.com",
    category: "database",
    singleVariant: true,
  },
  {
    name: "LangChain",
    iconDark: "/icons/tech/langchain.svg",
    iconLight: "/icons/tech/langchain.svg",
    url: "https://www.langchain.com",
    category: "ai",
    singleVariant: true,
  },
  {
    name: "Pinecone",
    iconDark: "/icons/tech/pinecone-light.svg",
    iconLight: "/icons/tech/pinecone-dark.svg",
    url: "https://www.pinecone.io",
    category: "ai",
    singleVariant: false,
  },
  {
    name: "Git",
    iconDark: "/icons/tech/git.svg",
    iconLight: "/icons/tech/git.svg",
    url: "https://git-scm.com",
    category: "tools",
    singleVariant: true,
  },
  {
    name: "GitHub",
    iconDark: "/icons/tech/github-dark.svg",
    iconLight: "/icons/tech/github-light.svg",
    url: "https://github.com",
    category: "tools",
    singleVariant: false,
  },
  {
    name: "Docker",
    iconDark: "/icons/tech/docker.svg",
    iconLight: "/icons/tech/docker.svg",
    url: "https://www.docker.com",
    category: "tools",
    singleVariant: true,
  },
  {
    name: "Vercel",
    iconDark: "/icons/tech/vercel-dark.svg",
    iconLight: "/icons/tech/vercel-light.svg",
    url: "https://vercel.com",
    category: "tools",
    singleVariant: false,
  },
  {
    name: "VS Code",
    iconDark: "/icons/tech/vscode-dark.svg",
    iconLight: "/icons/tech/vscode-light.svg",
    url: "https://code.visualstudio.com",
    category: "tools",
    singleVariant: false,
  },
  {
    name: "Linux",
    iconDark: "/icons/tech/linux.svg",
    iconLight: "/icons/tech/linux.svg",
    url: "https://kernel.org",
    category: "tools",
    singleVariant: true,
  },
  {
    name: "ChatGPT",
    iconDark: "/icons/tech/chatgpt-light.svg",
    iconLight: "/icons/tech/chatgpt-dark.svg",
    url: "https://chat.openai.com",
    category: "ai",
    singleVariant: false,
  },
  {
    name: "Claude", 
    iconDark: "/icons/tech/claude.svg",
    iconLight: "/icons/tech/claude.svg",
    url: "https://claude.ai",
    category: "ai",
    singleVariant: true, 
  }
]

export default techStack
