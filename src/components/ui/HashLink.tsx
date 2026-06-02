"use client"

import Link from "next/link"
import type { ReactNode } from "react"

interface HashLinkProps {
  hash: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function HashLink({ hash, children, className, onClick }: HashLinkProps) {
  return (
    <Link
      href={`/#${hash}`}
      className={className}
      onClick={() => {
        onClick?.()
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }, 0)
      }}
    >
      {children}
    </Link>
  )
}
