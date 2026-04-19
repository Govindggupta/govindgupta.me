import { ResumePageViewTracker } from "@/components/analytics/ResumePageViewTracker"
import { BackLink } from "@/components/ui/BackLink"
import { PageTransition } from "@/components/ui/PageTransition"
import { resumeConfig } from "@/config/resume"
import { buildMetadata } from "@/lib/metadata"

export async function generateMetadata() {
  return buildMetadata({
    title: "Resume",
    description: "View and download Govind Gupta's resume.",
    path: "/resume",
  })
}

export default function ResumePage() {
  return (
    <PageTransition className="mx-auto w-full max-w-none px-4 page-top-spacing md:px-6">
      <section className="space-y-6">
        <ResumePageViewTracker />
        <div className="space-y-4">
          <BackLink href="/" className="mb-0">
            Back home
          </BackLink>
          <h1 className="text-4xl font-bold text-foreground">Resume</h1>
          <p className="text-sm text-muted">View my resume below.</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <iframe
            title="Resume PDF"
            src={resumeConfig.previewUrl}
            className="h-150 sm:h-250 lg:h-300 w-full"
          />
        </div>
      </section>
    </PageTransition>
  )
}