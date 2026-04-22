import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export function IntroItem({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-4 font-mono text-sm", className)}
      {...props}
    />
  )
}

export function IntroItemIcon({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted ring-1 ring-foreground/10 ring-offset-1 ring-offset-background",
        "[&_svg]:pointer-events-none [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4.5",
        className,
      )}
      {...props}
    />
  )
}

export function IntroItemContent({
  className,
  ...props
}: ComponentProps<"p">) {
  return <p className={cn("text-balance", className)} {...props} />
}

export function IntroItemLink({
  className,
  ...props
}: ComponentProps<"a">) {
  return (
    <a
      className={cn("underline decoration-border underline-offset-[3px]", className)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  )
}