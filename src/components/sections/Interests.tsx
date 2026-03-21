import { interests } from "@/data/interests"

export function Interests() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-foreground">
          Outside of Work
        </h2>
        <p className="text-xs italic text-muted">in no order of preference</p>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {interests.map((interest) => (
          <InterestTile key={interest.label} interest={interest} />
        ))}
      </div>
    </section>
  )
}

function InterestTile({ interest }: { interest: (typeof interests)[number] }) {
  const isWide = interest.colSpan === 2
  const isBanner = interest.colSpan === 4
  const mobileLayout = getMobileLayout(interest.label)

  return (
    <div
      className={[
        "overflow-hidden rounded-2xl border border-border p-3 transition-colors duration-150 hover:bg-neutral-50 dark:hover:bg-neutral-900",
        mobileLayout.order,
        mobileLayout.span,
        mobileLayout.minHeight,
        isBanner ? "sm:col-span-4 sm:min-h-[56px]" : "",
        isWide ? "sm:col-span-2" : "",
        !isBanner ? "sm:min-h-[88px]" : "",
      ].join(" ")}
    >
      {isBanner ? (
        <div className="flex h-full items-center justify-between gap-4">
          <p className="text-sm font-medium leading-tight text-foreground">
            {interest.label}
          </p>
          <span className="select-none text-2xl" aria-hidden="true">
            {interest.emoji}
          </span>
        </div>
      ) : isWide ? (
        <div className="flex h-full flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium leading-tight text-foreground">
            {interest.label}
          </p>
          <span className="select-none text-3xl sm:text-4xl" aria-hidden="true">
            {interest.emoji}
          </span>
        </div>
      ) : (
        <div className="flex h-full flex-col justify-between">
          <p className="text-sm font-medium leading-tight text-foreground">
            {interest.label}
          </p>
          <span className="mt-2 self-end text-[1.75rem] leading-none select-none sm:text-3xl" aria-hidden="true">
            {interest.emoji}
          </span>
        </div>
      )}
    </div>
  )
}

function getMobileLayout(label: string) {
  const layouts: Record<
    string,
    { order: string; span: string; minHeight: string }
  > = {
    Badminton: {
      order: "order-1",
      span: "col-span-2 sm:col-span-1",
      minHeight: "min-h-[60px]",
    },
    Cricket: {
      order: "order-2",
      span: "col-span-1",
      minHeight: "min-h-[60px]",
    },
    Football: {
      order: "order-3",
      span: "col-span-1",
      minHeight: "min-h-[60px]",
    },
    Sketching: {
      order: "order-4",
      span: "col-span-1",
      minHeight: "min-h-[60px]",
    },
    Flute: {
      order: "order-5",
      span: "col-span-1",
      minHeight: "min-h-[60px]",
    },
    Piano: {
      order: "order-6",
      span: "col-span-2 sm:col-span-1",
      minHeight: "min-h-[60px]",
    },
    Gaming: {
      order: "order-7",
      span: "col-span-1",
      minHeight: "min-h-[60px]",
    },
    "Classical Music": {
      order: "order-8",
      span: "col-span-2 sm:col-span-1",
      minHeight: "min-h-[60px]",
    },
    Trekking: {
      order: "order-9",
      span: "col-span-1",
      minHeight: "min-h-[60px]",
    },
    Travel: {
      order: "order-10",
      span: "col-span-3 sm:col-span-1",
      minHeight: "min-h-[52px]",
    },
  }

  return (
    layouts[label] ?? {
      order: "",
      span: "col-span-1",
      minHeight: "min-h-[60px]",
    }
  )
}
