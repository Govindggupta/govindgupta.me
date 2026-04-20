import type { ReactNode } from "react"
import * as motion from "framer-motion/client"
import {
  BriefcaseBusiness,
  Clock3,
  Globe,
  Mail,
  Mars,
  MapPin,
} from "lucide-react"
import Image from "next/image"

import { ProfileImageBorder } from "@/components/ui/ProfileImageBorder"
import { TextFlip } from "@/components/ui/TextFlip"
import { VerifiedBadge } from "@/components/ui/VerifiedBadge"
import { heroFlipSentences } from "@/data/hero"
import { getGitHubProfile } from "@/lib/github"

import { HeroEmailLink } from "./HeroEmailLink"
import { HeroLocalTime } from "./HeroLocalTime"
import { HeroSocialLinks } from "./HeroSocialLinks"

const heroTransition = {
  duration: 0.35,
  ease: "easeOut" as const,
}

function InfoIconShell({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center justify-center p-px border-foreground/10 border rounded-[0.7rem]"> 
    <span
      className={[
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-[0.6rem] border leading-none",
        "border-muted/40 bg-black/3 text-muted dark:bg-white/10",
      ].join(" ")}
    >
      <span className="flex items-center justify-center leading-none [&_svg]:block">
        {children}
      </span>
    </span>
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
    <li className="flex min-w-0 items-center gap-2.5">
      <InfoIconShell>{icon}</InfoIconShell>
      <div className="flex min-w-0 items-center text-sm text-foreground sm:text-[0.95rem]">
        {children}
      </div>
    </li>
  )
}

export async function Hero() {
  const profile = await getGitHubProfile()
  const name = profile.name ?? "Govind Gupta"

  return (
    <section className="mx-auto w-full max-w-225 px-4 pt-20 pb-0 md:px-6">
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
                className="h-full w-full rounded-full border border-border object-cover p-1"
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

        <div className="space-y-4">
          <ul>
            <HeroInfoRow
              icon={
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15),0_0_0_8px_rgba(16,185,129,0.10)] " />
              }
            >
              Open to work
            </HeroInfoRow>
          </ul>

          <ul className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
            <HeroInfoRow icon={<BriefcaseBusiness size={19} strokeWidth={2} />}>
              Full Stack Developer
            </HeroInfoRow>

            <HeroInfoRow icon={<Mail size={19} strokeWidth={2} />}>
              <HeroEmailLink email="contact@govindgupta.me" />
            </HeroInfoRow>

            <HeroInfoRow icon={<MapPin size={19} strokeWidth={2} />}>
              Surat, Gujarat, India
            </HeroInfoRow>

            <HeroInfoRow icon={<Clock3 size={19} strokeWidth={2} />}>
              <HeroLocalTime />
            </HeroInfoRow>

            <HeroInfoRow icon={<Globe size={19} strokeWidth={2} />}>
              <a
                href="https://govindgupta.me"
                target="_blank"
                rel="noreferrer"
                className="block w-fit border-b border-transparent transition-colors duration-150 hover:border-current"
              >
                govindgupta.me
              </a>
            </HeroInfoRow>

            <HeroInfoRow icon={<Mars size={19} strokeWidth={2} />}>
              <span className="cursor-text">he/him</span>
            </HeroInfoRow>
          </ul>

          <HeroSocialLinks />
        </div>
      </motion.div>
    </section>
  )
}
