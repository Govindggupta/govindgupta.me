import Link from "next/link"

import { socials } from "@/data/socials"
import { Logo } from "@/components/ui/Logo"
import { BackToTop } from "@/components/ui/BackToTop"

const navigation = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="px-4 py-16 transition-colors duration-300 md:px-6">
      <div className="mx-auto w-full max-w-[900px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo />
            <p className="mt-1 text-sm text-muted">
              Building things for the web.
            </p>
            <a
              href="mailto:govindgupta@email.com"
              className="mt-1 inline-flex text-sm text-muted transition-colors duration-200 hover:text-foreground hover:underline"
            >
              govindgupta@email.com
            </a>
          </div>

          <div className="flex gap-12">
            <div>
              <p className="mb-3 text-xs tracking-widest text-muted uppercase">
                Navigate
              </p>
              <div className="space-y-0.5">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-0.5 text-sm text-muted transition-colors duration-200 hover:text-foreground"
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
                    className="block py-0.5 text-sm text-muted transition-colors duration-200 hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6 border-border md:mt-8" />

        <div className="flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-xs text-muted">
            © 2025 Govind Gupta. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Built with Next.js & Tailwind CSS
          </p>
          <div className="flex justify-center md:justify-end">
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  )
}
