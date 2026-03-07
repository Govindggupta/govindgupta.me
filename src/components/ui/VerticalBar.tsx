type VerticalBarProps = {
  height?: number;
  className?: string;
};

export default function VerticalBar({
  height = 20,
  className = "",
}: VerticalBarProps) {
  return (
    <span
      aria-hidden="true"
      className={`mx-0.5 inline-block w-px bg-border ${className}`}
      style={{ height }}
    />
  );
}
