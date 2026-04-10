"use client"

import Image from "next/image"
import Link from "next/link"

import logoFilled from "@/logos/black_filled.svg"
import logoFilledLight from "@/logos/white_filled.svg"
import logoHover from "@/logos/black_thick_border.svg"
import logoHoverLight from "@/logos/white_thick_border.svg"

export function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex shrink-0 items-center"
      aria-label="Go to home"
    >
      <span className="relative block aspect-15/16 h-13 overflow-hidden rounded-sm">
        <Image
          src={logoHoverLight}
          alt=""
          priority
          className="absolute inset-0 hidden h-full w-full object-contain opacity-0 transition-opacity duration-150 group-hover:opacity-100 dark:block"
        />
        <Image
          src={logoFilledLight}
          alt=""
          priority
          className="absolute inset-0 hidden h-full w-full object-contain transition-opacity duration-150 group-hover:opacity-0 dark:block"
        />
        <Image
          src={logoHover}
          alt=""
          priority
          className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-150 group-hover:opacity-100 dark:hidden"
        />
        <Image
          src={logoFilled}
          alt=""
          priority
          className="absolute inset-0 h-full w-full object-contain transition-opacity duration-150 group-hover:opacity-0 dark:hidden"
        />
      </span>
    </Link>
  )
}
