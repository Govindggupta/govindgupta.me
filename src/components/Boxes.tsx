type BoxesProps = {
  accent?: "slate" | "ember" | "mint" | "rose"
  children: React.ReactNode
  className?: string
  id?: string
}

const accentClasses: Record<NonNullable<BoxesProps["accent"]>, string> = {
  slate: "bg-[linear-gradient(180deg,rgba(16,16,16,0.96),rgba(8,8,8,0.98))]",
  ember: "bg-[linear-gradient(180deg,rgba(18,18,18,0.96),rgba(9,9,9,0.98))]",
  mint: "bg-[linear-gradient(180deg,rgba(17,17,17,0.96),rgba(8,8,8,0.98))]",
  rose: "bg-[linear-gradient(180deg,rgba(19,19,19,0.96),rgba(9,9,9,0.98))]",
}

export default function Boxes({
  accent = "slate",
  children,
  className,
  id,
}: BoxesProps) {
  const classes = [
    "portfolio-card relative min-h-0 overflow-hidden rounded-[1rem] border border-white/8 p-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-3",
    accentClasses[accent],
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section id={id} className={classes}>
      <div className="relative z-10 h-full">{children}</div>
    </section>
  )
}
