"use client"

import { useEffect, useState } from "react"

import { Check, Copy } from "lucide-react"

interface CopyEmailButtonProps {
  email: string
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) {
      return
    }

    const timeout = window.setTimeout(() => {
      setCopied(false)
    }, 2000)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [copied])

  async function handleCopy() {
    await navigator.clipboard.writeText(email)
    setCopied(true)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-foreground"
      aria-label={copied ? "Email copied" : "Copy email"}
    >
      {copied ? (
        <Check size={14} strokeWidth={1.8} />
      ) : (
        <Copy size={14} strokeWidth={1.8} />
      )}
      {copied ? "Copied" : "Copy email"}
    </button>
  )
}
