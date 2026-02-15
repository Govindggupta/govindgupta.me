type DotBackgroundProps = {
  className?: string;
  dotColor?: string;
  dotSize?: number;
  gap?: number;
};

export default function DotBackground({
  className = "",
  dotColor = "rgba(255,255,255,0.15)",
  dotSize = 1,
  gap = 26,
}: DotBackgroundProps) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`.trim()}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${gap}px ${gap}px`,
        }}
      />
    </div>
  );
}
