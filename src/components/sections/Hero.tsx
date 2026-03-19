import * as motion from "framer-motion/client"
import Image from "next/image"

import { getGitHubProfile } from "@/lib/github"
import { SocialLinks } from "@/components/ui/SocialLinks"

const heroTransition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1] as const,
}

export async function Hero() {
  const profile = await getGitHubProfile()
  const name = profile.name ?? "Govind Gupta"

  return (
    <section className="mx-auto w-full max-w-[900px] px-6 py-6 md:min-h-[34vh] md:px-6 md:py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={heroTransition}
        className="flex flex-row items-center justify-start gap-4 md:min-h-[34vh] md:gap-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...heroTransition, delay: 0.04 }}
          className="shrink-0"
        >
          <div className="h-[120px] w-[120px] overflow-hidden rounded-2xl border border-border md:h-[200px] md:w-[200px] border border-border p-2">
            <Image
              src={profile.avatar_url}
              alt={name}
              width={280}
              height={280}
              sizes="(min-width: 768px) 240px, 88px"
              priority
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...heroTransition, delay: 0.08 }}
          className="max-w-[34rem] min-w-0 text-left"
        >
          <h1 className="font-heading text-3xl leading-none font-bold tracking-[-0.08em] text-foreground sm:text-5xl md:text-6xl">
            {name}
          </h1>

          <p className="mt-2 text-sm text-muted sm:text-lg">
            Full Stack Developer
          </p>
          <div className="mt-4">
            <SocialLinks />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
