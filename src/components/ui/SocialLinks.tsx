import type { SocialLink } from "@/types"
import { socials } from "@/data/socials"

interface SocialLinksProps {
  className?: string
  links?: SocialLink[]
}

export function SocialLinks({
  className = "",
  links = socials,
}: SocialLinksProps) {
  return (
    <ul className={`flex items-center gap-3 ${className}`.trim()}>
      {links.map(({ href, icon: Icon, label }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="flex h-11 w-11 items-center justify-center border border-border bg-background text-foreground transition-colors duration-300 hover:bg-background-alt hover:opacity-60"
          >
            <Icon size={18} strokeWidth={1.8} />
          </a>
        </li>
      ))}
    </ul>
  )
}
