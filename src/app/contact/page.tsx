import { CopyEmailButton } from "@/components/ui/CopyEmailButton"
import { ContactForm } from "@/components/sections/ContactForm"
import { BackLink } from "@/components/ui/BackLink"
import { PageTransition } from "@/components/ui/PageTransition"
import { TechIcon } from "@/components/ui/TechIcon"
import contacts from "@/data/contacts"
import { buildMetadata } from "@/lib/metadata"
import { Phone } from "lucide-react"

const contactEmail = "govindgupta@email.com"

export async function generateMetadata() {
  return buildMetadata({
    title: "Contact",
    description:
      "Get in touch with Govind Gupta for freelance work, product collaboration, or engineering roles.",
    path: "/contact",
  })
}

export default function ContactPage() {
  return (
    <PageTransition className="mx-auto w-full max-w-[900px] px-4 section-space md:px-6">
      <section className="space-y-12">
        <div className="space-y-4">
          <BackLink href="/" className="mb-0">
            Back home
          </BackLink>
          <h1 className="font-heading text-step-4 tracking-[-0.06em] text-foreground">
            Let&apos;s Talk
          </h1>
          <p className="max-w-[900px] text-step-0 text-muted">
            If you are building on the web and need a developer who values clean
            systems, sharp interfaces, and steady execution, reach out.
          </p>
        </div>

        <ContactForm />

        <div className="border-t border-border pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={`mailto:${contactEmail}`}
              className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
            >
              {contactEmail}
            </a>
            <CopyEmailButton email={contactEmail} />
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="mb-6 text-sm font-medium text-foreground">
            Or reach me directly
          </h2>

          <div className="flex flex-col gap-3">
            {contacts.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                {item.useLucide ? (
                  <Phone
                    size={20}
                    strokeWidth={1.8}
                    className="shrink-0 text-foreground"
                  />
                ) : (
                  <TechIcon
                    tech={{
                      name: item.label,
                      iconDark: item.iconDark,
                      iconLight: item.iconLight,
                      category: "tools",
                      singleVariant: item.singleVariant,
                    }}
                    size={20}
                  />
                )}
                <p className="w-20 shrink-0 text-sm text-muted">{item.label}</p>
                <a
                  href={item.href}
                  target={item.newTab ? "_blank" : undefined}
                  rel={item.newTab ? "noreferrer" : undefined}
                  className="text-sm text-foreground transition-opacity duration-200 hover:opacity-60 hover:underline"
                >
                  {item.value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
