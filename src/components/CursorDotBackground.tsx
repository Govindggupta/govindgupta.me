"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type CursorDotBackgroundProps = {
  className?: string;
  dotColor?: string;
  dotSize?: number;
  gap?: number;
  revealSize?: number;
};

export default function CursorDotBackground({
  className = "",
  dotColor = "rgba(255,255,255,0.22)",
  dotSize = 1,
  gap = 24,
  revealSize = 280,
}: CursorDotBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const nextPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const paint = () => {
      const point = nextPosRef.current;
      if (!point || !containerRef.current) return;

      containerRef.current.style.setProperty("--mouse-x", `${point.x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${point.y}px`);
      containerRef.current.style.setProperty("--cursor-opacity", "1");
      frameRef.current = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      nextPosRef.current = { x: event.clientX, y: event.clientY };
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(paint);
      }
    };

    const handlePointerLeave = () => {
      container.style.setProperty("--cursor-opacity", "0");
    };

    document.body.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.body.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      document.body.removeEventListener("pointermove", handlePointerMove);
      document.body.removeEventListener("pointerleave", handlePointerLeave);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`.trim()}
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
          "--cursor-opacity": "0",
        } as CSSProperties
      }
    >
      <div
        className="absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: "var(--cursor-opacity)",
          backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${gap}px ${gap}px`,
          maskImage:
            `radial-gradient(${revealSize}px circle at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)`,
          WebkitMaskImage:
            `radial-gradient(${revealSize}px circle at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)`,
        }}
      />
    </div>
  );
}
