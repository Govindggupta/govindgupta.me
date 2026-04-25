import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type TooltipSide = "top" | "bottom"

type TooltipProps = {
  children: ReactNode
  side?: TooltipSide
  className?: string
  contentClassName?: string
  arrowClassName?: string
}

const containerClasses: Record<TooltipSide, string> = {
  top: "absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2",
  bottom: "absolute top-full left-1/2 z-20 mt-2 -translate-x-1/2",
}

const arrowClasses: Record<TooltipSide, string> = {
  top: "absolute top-full left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1 rotate-45 border-r border-b border-white/10 bg-neutral-950 dark:border-black/10 dark:bg-white",
  bottom:
    "absolute bottom-full left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1 rotate-45 border-l border-t border-white/10 bg-neutral-950 dark:border-black/10 dark:bg-white",
}

export function Tooltip({
  children,
  side = "top",
  className,
  contentClassName,
  arrowClassName,
}: TooltipProps) {
  return (
    <div
      role="tooltip"
      className={cn(
        "pointer-events-none whitespace-nowrap",
        containerClasses[side],
        className
      )}
    >
      <span
        className={cn(
          "relative inline-flex items-center rounded-[0.9rem] border border-white/10 bg-neutral-950 px-3.5 py-2.5 text-[13px] leading-none font-medium text-white dark:border-black/10 dark:bg-white dark:text-neutral-900",
          contentClassName
        )}
      >
        {children}
        <span
          aria-hidden="true"
          className={cn(arrowClasses[side], arrowClassName)}
        />
      </span>
    </div>
  )
}
