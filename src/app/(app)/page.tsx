import Image from "next/image";
import Link from "next/link";
import Panel from "@/components/portfolio/Panel";
import {
  featuredProjects,
  focusAreas,
  portfolio,
  quickFacts,
  routeHighlights,
  socialLinks,
  stack,
} from "@/content/portfolio";

const primaryButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-sm border border-foreground bg-foreground px-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-background transition-colors duration-200 hover:bg-background hover:text-foreground";

const secondaryButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-sm border border-border px-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors duration-200 hover:border-foreground/30 hover:bg-muted/35";

function ArrowText() {
  return <span aria-hidden="true"> -&gt;</span>;
}

export default function Home() {
  return (
    <main className="screen-line-before screen-line-after relative mb-6 p-1 py-1.25">
        <div className="relative rounded-sm border border-border bg-background/92 p-3 shadow-[0_20px_60px_-36px_rgba(0,0,0,0.8)] sm:p-4">
          <div className="grid auto-rows-[minmax(170px,auto)] grid-cols-1 gap-3 md:grid-cols-6">
            <Panel
              eyebrow="Govind Gupta / Portfolio"
              title={portfolio.headline}
              className="md:col-span-4 md:row-span-2"
            >
              <div className="space-y-6">
                <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
                  {portfolio.introduction}
                </p>

                <div className="flex flex-wrap gap-2.5">
                  <Link href="/projects" className={primaryButtonClassName}>
                    View Projects
                  </Link>
                  <Link href="/about" className={secondaryButtonClassName}>
                    About Me
                  </Link>
                  <a
                    href={portfolio.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={secondaryButtonClassName}
                  >
                    GitHub Profile
                  </a>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {quickFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-sm border border-border bg-muted/15 p-3"
                    >
                      <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                        {fact.label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-foreground">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>

            <Panel eyebrow="Profile" title={portfolio.name} className="md:col-span-2 md:row-span-2">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-sm border border-border bg-muted/20">
                  <Image
                    src={portfolio.avatarUrl}
                    alt={`${portfolio.name} GitHub profile`}
                    width={420}
                    height={420}
                    className="h-auto w-full object-cover grayscale"
                    priority
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{portfolio.handle}</p>
                  <p className="text-sm leading-6 text-foreground">{portfolio.location}</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {portfolio.availability}
                  </p>
                </div>

                <div className="space-y-2 border-t border-border pt-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-sm border border-transparent px-1 py-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:border-border hover:text-foreground"
                    >
                      <span>{link.label}</span>
                      <span className="truncate pl-4 text-right text-xs uppercase tracking-[0.16em]">
                        {link.value}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </Panel>

            <Panel
              eyebrow="Featured Work"
              title="Pinned builds from GitHub"
              className="md:col-span-3"
            >
              <div className="space-y-4">
                {featuredProjects.map((project) => (
                  <a
                    key={project.name}
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-sm border border-border p-3 transition-colors duration-200 hover:border-foreground/25 hover:bg-muted/20"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          {project.tag}
                        </p>
                        <h3 className="mt-1 text-base font-semibold text-foreground">
                          {project.name}
                        </h3>
                      </div>
                      <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        Repo
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {project.summary}
                    </p>
                  </a>
                ))}
              </div>
            </Panel>

            <Panel
              href="/about"
              eyebrow="About"
              title="How I like to build"
              className="md:col-span-3"
            >
              <div className="space-y-4">
                <p className="text-sm leading-7 text-muted-foreground">
                  I prefer products that feel structured and thoughtful rather than overloaded.
                  Clean layouts, usable flows, and code that still makes sense later are the
                  baseline. little change.
                </p>
                <p className="text-sm leading-7 text-muted-foreground">
                  This site is intentionally minimal: a compact shell, strong borders, and a
                  homepage that works like a quick scan of who I am and what I build.
                </p>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-foreground">
                  Read more<ArrowText />
                </p>
              </div>
            </Panel>

            <Panel eyebrow="Stack" title="What I reach for" className="md:col-span-2">
              <div className="flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-sm border border-border bg-muted/15 px-2.5 py-1.5 text-xs uppercase tracking-[0.16em] text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Panel>

            <Panel eyebrow="Focus" title="Where I add value" className="md:col-span-2">
              <div className="space-y-3">
                {focusAreas.map((area) => (
                  <div key={area.title} className="rounded-sm border border-border bg-muted/10 p-3">
                    <p className="text-sm font-semibold text-foreground">{area.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel eyebrow="Explore" title="Use the rest of the site" className="md:col-span-2">
              <div className="space-y-3">
                {routeHighlights.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="block rounded-sm border border-border p-3 transition-colors duration-200 hover:border-foreground/25 hover:bg-muted/20"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-foreground">{route.title}</p>
                      <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        Open
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {route.description}
                    </p>
                  </Link>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </main>
  );