import { BackLink } from "@/components/ui/BackLink"
import { PageTransition } from "@/components/ui/PageTransition"
import { buildMetadata } from "@/lib/metadata"

const resumeFilePath = "/resume/resume.pdf"
const resumeViewerPath = "/resume/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"

export async function generateMetadata() {
  return buildMetadata({
    title: "Resume",
    description: "View and download Govind Gupta's resume.",
    path: "/resume",
  })
}

export default function ResumePage() {
  return (
    <PageTransition className="mx-auto w-full max-w-none px-2 section-space md:px-4">
      <section className="space-y-6">
        <div className="space-y-4">
          <BackLink href="/" className="mb-0">
            Back home
          </BackLink>
          <h1 className="text-2xl font-bold text-foreground">Resume</h1>
          <p className="text-sm text-muted">View my resume below.</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <iframe
            title="Resume PDF"
            src={resumeViewerPath}
            className="h-[88vh] w-full"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={resumeFilePath}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm text-foreground transition-colors duration-200 hover:bg-muted"
          >
            Open in new tab
          </a>
          <a
            href={resumeFilePath}
            download
            className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm text-foreground transition-colors duration-200 hover:bg-muted"
          >
            Download PDF
          </a>
        </div>
      </section>
    </PageTransition>
  )
}
