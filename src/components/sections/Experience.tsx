import { experiences, type Experience as ExperienceItem } from "@/data/experience"

function formatType(type: ExperienceItem["type"]) {
  switch (type) {
    case "full-time":
      return "Full-time"
    case "part-time":
      return "Part-time"
    case "internship":
      return "Internship"
    case "freelance":
      return "Freelance"
    default:
      return type
  }
}

export function Experience() {
  if (experiences.length === 0) {
    return null
  }

  return (
    <section>
      <p className="mb-6 text-xs tracking-widest text-muted uppercase">
        Experience
      </p>

      <div>
        {experiences.map((experience, index) => {
          const companyContent = experience.url ? (
            <a
              href={experience.url}
              target="_blank"
              rel="noreferrer"
              className="transition-opacity duration-200 hover:opacity-70"
            >
              {experience.company}
            </a>
          ) : (
            experience.company
          )

          return (
            <div key={`${experience.company}-${experience.role}`}>
              <div className="flex flex-col gap-1 pb-8">
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {companyContent}
                      </p>
                      {experience.current ? (
                        <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">
                          Current
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {experience.role} · {experience.location}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-xs text-muted">{experience.duration}</p>
                    <span className="mt-1 inline-flex rounded-md border border-border px-2 py-0.5 text-xs text-muted">
                      {formatType(experience.type)}
                    </span>
                  </div>
                </div>

                {experience.description.length > 0 ? (
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    {experience.description.slice(0, 3).map((point) => (
                      <li key={point} className="text-sm text-muted">
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {experience.tech.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {experience.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-border px-2 py-0.5 text-xs text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              {index < experiences.length - 1 ? (
                <hr className="mt-8 border-border" />
              ) : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}
