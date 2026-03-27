import type { ComponentPropsWithoutRef } from "react"

export const keyboardKeyBaseClassName =
  "inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap border bg-gradient-to-b text-center font-medium tracking-wide transition-[transform,box-shadow]"

export const keyboardKeyToneClassNames = {
  auto: "border-[#cfcfd6] from-[#f4f4f6] to-[#dddde3] shadow-[inset_0_2px_4px_rgba(255,255,255,0.85),inset_0_-4px_8px_rgba(170,170,180,0.28),0_4px_10px_rgba(120,120,130,0.22)] dark:border-[#2f2f2f] dark:from-[#2a2a2a] dark:to-[#1a1a1a] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),inset_0_-4px_8px_rgba(0,0,0,0.6),0_4px_10px_rgba(0,0,0,0.8)]",
  light:
    "border-[#d1d1d1] from-[#f5f5f5] to-[#e5e5e5] shadow-[inset_0_2px_4px_rgba(255,255,255,0.85),inset_0_-4px_8px_rgba(170,170,180,0.28),0_4px_10px_rgba(120,120,130,0.22)]",
  dark: "border-[#3a3a3a] from-[#3a3a3a] to-[#3a3a3a] shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),inset_0_-4px_8px_rgba(0,0,0,0.6),0_4px_10px_rgba(0,0,0,0.8)]",
} as const

export const keyboardKeyTextToneClassNames = {
  auto: "text-[#505866] dark:text-gray-900",
  light: "text-[#505866]",
  dark: "text-gray-300",
} as const

export const keyboardKeySizeClassNames = {
  xs: "h-8 min-w-8 rounded-[0.45rem] px-2",
  sm: "h-10 min-w-10 rounded-[0.6rem] px-3",
  md: "h-14 min-w-14 rounded-[0.85rem] px-4",
  display: "h-20 min-w-20 rounded-2xl px-6",
} as const

export const keyboardKeyTextSizeClassNames = {
  xs: "text-sm leading-none",
  sm: "text-lg leading-none",
  md: "text-xl leading-none",
  display: "text-2xl leading-none",
} as const

export type KeyboardKeyTone = keyof typeof keyboardKeyToneClassNames
export type KeyboardKeySize = keyof typeof keyboardKeySizeClassNames

type KeyboardKeyProps = ComponentPropsWithoutRef<"kbd"> & {
  size?: KeyboardKeySize
  tone?: KeyboardKeyTone
}

function mergeClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ")
}

export function KeyboardKey({
  children,
  size = "md",
  tone = "auto",
  className,
  ...props
}: KeyboardKeyProps) {
  return (
    <kbd
      className={mergeClassNames(
        keyboardKeyBaseClassName,
        keyboardKeySizeClassNames[size],
        keyboardKeyToneClassNames[tone],
        keyboardKeyTextSizeClassNames[size],
        keyboardKeyTextToneClassNames[tone],
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  )
}

export default KeyboardKey
