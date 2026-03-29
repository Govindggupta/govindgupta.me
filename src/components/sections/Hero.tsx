import type { ReactNode } from "react"
import * as motion from "framer-motion/client"
import {
  BriefcaseBusiness,
  Globe,
  Mail,
  MapPin,
  User,
} from "lucide-react"
import Image from "next/image"

import { ProfileImageBorder } from "@/components/ui/ProfileImageBorder"
import { TextFlip } from "@/components/ui/TextFlip"
import { VerifiedBadge } from "@/components/ui/VerifiedBadge"
import { heroFlipSentences } from "@/data/hero"
import { socials } from "@/data/socials"
import { getGitHubProfile } from "@/lib/github"

const heroTransition = {
  duration: 0.35,
  ease: "easeOut" as const,
}

function InfoIconShell({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background-alt/80 text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_1px_2px_rgba(0,0,0,0.35)]">
      {children}
    </span>
  )
}

function HeroInfoRow({
  icon,
  children,
}: {
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <InfoIconShell>{icon}</InfoIconShell>
      <div className="min-w-0 text-sm text-foreground">{children}</div>
    </div>
  )
}

export async function Hero() {
  const profile = await getGitHubProfile()
  const name = profile.name ?? "Govind Gupta"

  return (
    <section className="mx-auto w-full max-w-[900px] px-4 pt-20 pb-0 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={heroTransition}
        className="space-y-12"
      >
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <div className="flex shrink-0 items-center justify-start">
            <ProfileImageBorder
              size={168}
              className="h-26 w-26 sm:h-30 sm:w-30 md:h-42 md:w-42"
            >
              <Image
                src={profile.avatar_url}
                alt={name}
                width={168}
                height={168}
                sizes="(min-width: 768px) 168px, (min-width: 640px) 120px, 104px"
                priority
                className="h-full w-full rounded-full object-cover border border-border p-1"
              />
            </ProfileImageBorder>
          </div>

          <div className="min-w-0 space-y-1">
            <h1 className="flex items-center gap-1.5 text-3xl leading-none font-semibold tracking-tight text-foreground sm:gap-2 sm:text-4xl md:text-[3.35rem]">
              <span className="block">{name}</span>
              <VerifiedBadge className="relative top-[0.02em] h-[0.52em] w-[0.52em] self-center md:h-[0.46em] md:w-[0.46em]" />
            </h1>
            <TextFlip
              texts={heroFlipSentences}
              className="block text-base text-muted sm:text-lg"
            />
          </div>
        </div>

        <div className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
          <div className="space-y-3">
            <HeroInfoRow
              icon={<BriefcaseBusiness size={14} strokeWidth={1.8} />}
            >
              Full Stack Developer
            </HeroInfoRow>

            <HeroInfoRow icon={<MapPin size={14} strokeWidth={1.8} />}>
              Surat, Gujarat, India
            </HeroInfoRow>

            <HeroInfoRow icon={<Globe size={14} strokeWidth={1.8} />}>
              <a
                href="https://govindgupta.me"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-border decoration-[1px] underline-offset-[3px] hover:opacity-70"
              >
                govindgupta.me
              </a>
            </HeroInfoRow>
          </div>

          <div className="space-y-3">
            <HeroInfoRow
              icon={
                <span className="h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-500" />
              }
            >
              Open to work
            </HeroInfoRow>

            <HeroInfoRow icon={<Mail size={14} strokeWidth={1.8} />}>
              <a
                href="mailto:contact@govindgupta.me"
                className="underline decoration-border decoration-[1px] underline-offset-[3px] hover:opacity-70"
              >
                contact@govindgupta.me
              </a>
            </HeroInfoRow>

            <HeroInfoRow icon={<User size={14} strokeWidth={1.8} />}>
              he/him
            </HeroInfoRow>
          </div>
        </div>

        <div>
          <ul className="flex flex-wrap items-center gap-3">
            {socials.map(({ href, icon: Icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-background-alt/85 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.08)] transition-colors duration-200 hover:bg-background-alt dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_1px_2px_rgba(0,0,0,0.28)]"
                >
                  <Icon size={17} strokeWidth={1.8} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}
