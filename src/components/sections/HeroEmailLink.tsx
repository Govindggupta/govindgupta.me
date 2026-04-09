"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"

type HeroEmailLinkProps = {
  email: string
}

function fallbackCopyText(text: string) {
  const textArea = document.createElement("textarea")
  textArea.value = text
  textArea.setAttribute("readonly", "")
  textArea.style.position = "fixed"
  textArea.style.top = "0"
  textArea.style.left = "0"
  textArea.style.opacity = "0"
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  let copied = false
  try {
    copied = document.execCommand("copy")
  } catch {
    copied = false
  }

  document.body.removeChild(textArea)
  return copied
}

export function HeroEmailLink({ email }: HeroEmailLinkProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) {
      return
    }

    const timer = window.setTimeout(() => {
      setCopied(false)
    }, 1200)

    return () => window.clearTimeout(timer)
  }, [copied])

  async function handleCopy(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email)
      } else if (!fallbackCopyText(email)) {
        throw new Error("Clipboard copy not available")
      }
      setCopied(true)
      event.currentTarget.blur()
    } catch {
      const copied = fallbackCopyText(email)
      setCopied(copied)
      if (copied) {
        event.currentTarget.blur()
      }
    }
  }

  return (
    <span className="group inline-flex items-center gap-1.5">
      <a
        href={`mailto:${email}`}
        className="inline-flex w-fit items-center whitespace-nowrap border-b border-transparent transition-colors duration-150 hover:border-current"
      >
        {email}
      </a>
      <button
        type="button"
        aria-label={copied ? "Email copied" : "Copy email"}
        title={copied ? "Copied" : "Copy"}
        onClick={handleCopy}
        className={`inline-flex items-center justify-center rounded-sm transition-all duration-200 ease-out ${
          copied
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 focus-visible:opacity-100 focus-visible:scale-100"
        }`}
      >
        <span className="relative h-4 w-4">
          <Copy
            size={15}
            strokeWidth={2}
            className={`absolute inset-0 text-current transition-all duration-200 ease-out ${
              copied ? "scale-75 opacity-0" : "scale-100 opacity-100"
            }`}
          />
          <Check
            size={15}
            strokeWidth={2}
            className={`absolute inset-0 text-current transition-all duration-200 ease-out ${
              copied ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          />
        </span>
      </button>
    </span>
  )
}
