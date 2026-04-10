import { socials } from "@/data/socials"

function getSocialHoverBgClass(label: string) {
  switch (label) {
    case "LinkedIn":
      return "hover:bg-[#E8F0FE] hover:text-[#0A66C2] dark:hover:bg-[#0A66C2] dark:hover:text-white"
    case "GitHub":
      return "hover:bg-[#FCEEF7] hover:text-[#BF4B8A] dark:hover:bg-[#BF4B8A] dark:hover:text-white"
    case "Discord":
      return "hover:bg-[#EEF0FF] hover:text-[#5865F2] dark:hover:bg-[#5865F2] dark:hover:text-white"
    case "X":
      return "hover:bg-[#E8F5FD] hover:text-[#1D9BF0] dark:hover:bg-[#1D9BF0] dark:hover:text-white"
    default:
      return ""
  }
}

function getSocialIconSize(label: string) {
  return label === "X" ? 16 : 18
}

export function HeroSocialLinks() {
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
              className={`flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-(--accent) text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.08)] transition-colors duration-150 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_1px_2px_rgba(0,0,0,0.28)] ${getSocialHoverBgClass(label)}`}
            >
              <Icon size={getSocialIconSize(label)} strokeWidth={2} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
