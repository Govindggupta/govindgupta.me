import Link from "next/link"

import { socials } from "@/data/socials"
import { Logo } from "@/components/ui/Logo"

const navigation = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-background-alt/70 px-4 py-16 md:px-6">
      <div className="mx-auto w-full max-w-[900px]">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-start">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-[28rem] text-sm leading-6 text-muted">
              Ready to Collaborate!!
            </p>
            <a
              href="mailto:contact@govindgupta.me"
              className="inline-flex text-sm text-muted hover:text-foreground hover:underline"
            >
              contact@govindgupta.me
            </a>
          </div>

          <div className="grid grid-cols-2 gap-12 md:justify-self-end">
            <div>
              <p className="mb-3 text-xs tracking-widest text-muted uppercase">
                Navigate
              </p>
              <div className="space-y-0.5">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-0.5 text-sm text-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs tracking-widest text-muted uppercase">
                Elsewhere
              </p>
              <div className="space-y-0.5">
                {socials.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block py-0.5 text-sm text-muted hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-border" />

        <div className="flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-xs text-muted">
            © 2026 Govind Gupta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
