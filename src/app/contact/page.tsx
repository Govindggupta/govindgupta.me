import { ContactForm } from "@/components/sections/ContactForm"
import { PageTransition } from "@/components/ui/PageTransition"
import { CopyEmailButton } from "@/components/ui/CopyEmailButton"
import { buildMetadata } from "@/lib/metadata"

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
      <section className="space-y-10">
        <div className="space-y-3">
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
      </section>
    </PageTransition>
  )
}
