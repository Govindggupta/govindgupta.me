import type { Config } from "tailwindcss"

const config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
      },
      maxWidth: {
        content: "720px",
      },
    },
  },
} satisfies Config

export default config
