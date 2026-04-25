"use client"

import { useEffect, useState } from "react"

import Image from "next/image"
import { useTheme } from "next-themes"

import { Tooltip } from "@/components/ui/Tooltip"
import techStack from "@/data/techstack"

export function TechStack() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-4xl font-bold tracking-tight text-foreground">
          Stack
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-4 sm:gap-x-6">
        {techStack.map((item) => {
          const iconSrc =
            mounted && resolvedTheme === "dark" ? item.iconLight : item.iconDark

          return (
            <a
              key={item.name}
              href={item.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="group relative flex"
            >
              {mounted ? (
                <Image
                  src={iconSrc}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain transition-transform duration-150 group-hover:scale-100 sm:h-9 sm:w-9 md:h-10 md:w-10"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="block h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
                />
              )}

              <Tooltip className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
                {item.name}
              </Tooltip>
            </a>
          )
        })}
      </div>
    </section>
  )
}
