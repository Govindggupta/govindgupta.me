# Govind Gupta 

[![GitHub Repo Views](https://gitviews.com/repo/govindggupta/govindgupta.me.svg?style=flat&label-color=%23555&color=%23f59e0b)](https://gitviews.com/repo/govindggupta/govindgupta.me)

A modern, responsive developer portfolio built with Next.js 15, featuring a blog with MDX support, dark/light theme, and interactive UI elements.

> **Live Site:** [govindgupta.me](https://govindgupta.me)

[![Govind Gupta portfolio in dark mode](./.github/assets/screenshot-desktop-dark.png#gh-dark-mode-only)](https://govindgupta.me#gh-dark-mode-only)
[![Govind Gupta portfolio in light mode](./.github/assets/screenshot-desktop-light.png#gh-light-mode-only)](https://govindgupta.me#gh-light-mode-only)

## Features

- **MDX Blog** — Write articles in MDX with support for GFM syntax, code highlighting, and custom components
- **Theme System** — Dark and light modes with automatic system preference detection and smooth transitions
- **Responsive Design** — Fully optimized for all screen sizes, from mobile to desktop
- **SEO Optimized** — Meta tags, Open Graph cards, and sitemap generation for better search visibility
- **Analytics** — Integrated with Umami and Vercel Analytics for Privacy-first tracking
- **Interactive Elements** — GitHub contribution graph, contact form with validation, and animated UI transitions
- **GitHub Integration** — Live GitHub contribution graph showcasing recent coding activity
- **Performance** — Built with Next.js App Router, static generation, and optimized asset loading

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Blog | MDX + next-mdx-remote |
| Icons | Lucide React |
| Themes | next-themes |
| Deployment | Vercel |

**Dependencies:**
- @vercel/analytics — Vercel Analytics
- clsx — Conditional classes
- gray-matter — Parse frontmatter
- react — React 19
- react-dom — React DOM 19
- remark-gfm — GitHub Flavored Markdown
- tailwind-merge — Tailwind class merging

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/govindggupta/govindgupta.me.git
cd govindgupta.me

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run format` | Check code formatting |

## Project Structure

```
.
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (app)/           # Main application routes
│   │   ├── api/             # API routes
│   │   └── blog/            # Blog pages
│   ├── components/          # React components
│   │   ├── sections/        # Page sections (Hero, About, etc.)
│   │   ├── ui/              # Reusable UI components
│   │   └── analytics/       # Analytics components
│   ├── content/             # MDX blog content
│   └── providers/           # React context providers
├── public/                  # Static assets
├── .github/                 # GitHub assets & workflows
└── out/                     # Build output
```

## Contributing

See the [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is under the [ISC License](LICENSE).

---

<a href="https://github.com/govindggupta/govindgupta.me">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/image?repos=govindggupta%2Fgovindgupta.me&type=date&theme=dark&legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/image?repos=govindggupta%2Fgovindgupta.me&type=date&legend=top-left" />
    <img alt="Star History Chart" src="https://api.star-history.com/image?repos=govindggupta%2Fgovindgupta.me&type=date&legend=top-left" />
  </picture>
</a>