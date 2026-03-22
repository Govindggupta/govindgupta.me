import Image from "next/image"
import Boxes from "./Boxes"

type ProfileLink = {
  href: string
  label: string
  value: string
}

type ProfileImageProps = {
  className?: string
  imageSrc?: string
  links?: ProfileLink[]
  name?: string
  role?: string
  summary?: string
}

export default function ProfileImage({
  className,
  imageSrc = "https://avatars.githubusercontent.com/u/119047426?v=4",
  links = [
    {
      href: "https://github.com/govindggupta",
      label: "GitHub",
      value: "govindggupta",
    },
    {
      href: "https://linkedin.com/in/yourhandle",
      label: "LinkedIn",
      value: "yourhandle",
    },
    {
      href: "mailto:hello@yourdomain.com",
      label: "Email",
      value: "hello@yourdomain.com",
    },
  ],
  name = "Govind Gupta",
  role = "Developer building clean frontend systems and focused web products.",
  summary = "A compact intro card for your identity, current focus, and direct links.",
}: ProfileImageProps) {
  return (
    <Boxes accent="slate" className={className}>
      <div className="flex h-full min-h-0 flex-col justify-between gap-2.5">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] tracking-[0.28em] text-white/70 uppercase">
            <span className="h-2 w-2 rounded-full bg-white/80" />
            Available for work
          </div>
          <p className="text-[10px] tracking-[0.24em] text-white/40 uppercase">
            Intro
          </p>
        </div>

        <div className="grid min-w-0 flex-1 gap-2.5 md:grid-cols-[96px_1fr] md:items-center">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[96px] overflow-hidden rounded-[0.9rem] border border-white/10 bg-black/30 shadow-[0_10px_24px_rgba(0,0,0,0.24)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_58%)]" />
            <Image
              className="object-cover"
              src={imageSrc}
              alt={name}
              fill
              priority
              sizes="(max-width: 1024px) 38vw, 160px"
            />
          </div>

          <div className="flex min-w-0 flex-col justify-between gap-3">
            <div className="space-y-1.5">
              <p className="text-[10px] tracking-[0.24em] text-white/40 uppercase">
                Based in India
              </p>
              <h1 className="portfolio-display text-[1.6rem] leading-none text-white xl:text-[1.85rem]">
                {name}
              </h1>
              <p className="max-w-sm text-[13px] leading-5 text-white/66">
                {role}
              </p>
            </div>

            <p className="max-w-sm text-[13px] leading-5 text-white/52">
              {summary}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-[0.8rem] border border-white/8 bg-black/20 px-2 py-2 transition hover:bg-white/8"
            >
              <p className="text-[9px] tracking-[0.2em] text-white/34 uppercase">
                {link.label}
              </p>
              <p className="mt-1.5 truncate text-[13px] font-medium text-white/76">
                {link.value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </Boxes>
  )
}
