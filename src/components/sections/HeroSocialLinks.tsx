"use client"

import { socials } from "@/data/socials"
import { useUmami } from "@/hooks/use-umami"

function getSocialHoverBgClass(label: string) {
  switch (label) {
    case "LinkedIn":
      return "bg-[#0A66C2]"
    case "GitHub":
      return "bg-[#2ea043]"
    case "Discord":
      return "bg-[#5865F2]"
    case "X":
      return "bg-[#1D9BF0]"
    default:
      return ""
  }
}

function getSocialHoverTextClass(label: string) {
  switch (label) {
    case "LinkedIn":
      return "hover:text-white focus-visible:text-white"
    case "GitHub":
      return "hover:text-white focus-visible:text-white"
    case "Discord":
      return "hover:text-white focus-visible:text-white"
    case "X":
      return "hover:text-white focus-visible:text-white"
    default:
      return ""
  }
}

function getSocialIconSize(label: string) {
  return label === "X" ? 16 : 18
}

export function HeroSocialLinks() {
  const { trackEvent } = useUmami()

  return (
    <div className="space-y-2.5 pt-4">
      <p className="text-sm font-medium tracking-[0.02em] text-muted">
        Find me on
      </p>
      <ul className="flex flex-wrap items-center gap-4">
        {socials.map(({ href, icon: Icon, label }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              onClick={() => {
                trackEvent("social_button_click", {
                  platform: label,
                  href,
                  location: "hero",
                })
              }}
              className={`group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-muted/20 bg-black/3 dark:bg-white/8 text-foreground transition-colors duration-150 ${getSocialHoverTextClass(label)}`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute top-0 left-0 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 rounded-full scale-0 transition-transform duration-300 ease-out group-hover:scale-100 ${getSocialHoverBgClass(label)}`}
              />
              <span className="relative z-10">
                <Icon size={getSocialIconSize(label)} strokeWidth={2} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
