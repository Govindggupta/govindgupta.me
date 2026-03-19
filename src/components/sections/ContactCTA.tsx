import Link from "next/link"

export function ContactCTA() {
  return (
    <section className="space-y-6 border-t border-border pt-10">
      <div className="space-y-3">
        <p className="section-kicker">Contact</p>
        <h2 className="font-heading text-step-2 text-foreground">
          Open to focused product and frontend work.
        </h2>
        <p className="max-w-[34rem] text-step-0 text-foreground-soft">
          If you are building a thoughtful web product and need clean
          implementation, sharp UI, and steady execution, I am available to
          talk.
        </p>
      </div>

      <div className="flex justify-end">
        <Link href="/contact" className="section-link">
          Get in touch →
        </Link>
      </div>
    </section>
  )
}
