import Link from "next/link"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-[900px] items-center px-4 py-16 md:px-6">
      <div className="space-y-4">
        <p className="font-heading text-6xl font-bold tracking-[-0.08em] text-foreground">
          404
        </p>
        <p className="text-step-0 text-muted">This page doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-flex text-sm text-muted transition-colors duration-200 hover:text-foreground"
        >
          Go home →
        </Link>
      </div>
    </main>
  )
}
