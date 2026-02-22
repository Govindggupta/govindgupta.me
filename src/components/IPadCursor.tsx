"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CursorPosition {
  x: number;
  y: number;
}

interface TargetRect {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: string;
}

interface IPadCursorContextType {
  registerElement: (el: HTMLElement) => void;
  unregisterElement: (el: HTMLElement) => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const IPadCursorContext = createContext<IPadCursorContextType | null>(null);

// ─── Hook for child elements ─────────────────────────────────────────────────

export function useCursorHover<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const ctx = useContext(IPadCursorContext);

  useEffect(() => {
    const el = ref.current;
    if (!el || !ctx) return;
    ctx.registerElement(el);
    return () => ctx.unregisterElement(el);
  }, [ctx]);

  return ref;
}

// ─── Wrapper component ──────────────────────────────────────────────────────

export function CursorTarget({
  children,
  className,
  as: Component = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
} & Record<string, unknown>) {
  const ref = useCursorHover<HTMLDivElement>();
  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  );
}

// ─── Lerp / spring helpers ──────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ─── Main cursor provider ───────────────────────────────────────────────────

const CURSOR_SIZE = 20;
const MAGNETIC_DISTANCE = 12; // px — subtle pull towards target center

export function IPadCursorProvider({ children }: { children: React.ReactNode }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef<CursorPosition>({ x: -100, y: -100 });
  const currentPos = useRef<CursorPosition>({ x: -100, y: -100 });
  const currentSize = useRef({ width: CURSOR_SIZE, height: CURSOR_SIZE });
  const currentRadius = useRef(CURSOR_SIZE / 2);
  const currentOpacity = useRef(1);
  const targetElements = useRef<Set<HTMLElement>>(new Set());
  const hoveredEl = useRef<HTMLElement | null>(null);
  const animFrameId = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const hasReceivedMouseEvent = useRef(false);
  const needsSnap = useRef(true); // snap cursor on next mouse entry

  // Register / unregister interactive elements
  const registerElement = useCallback((el: HTMLElement) => {
    targetElements.current.add(el);
  }, []);

  const unregisterElement = useCallback((el: HTMLElement) => {
    targetElements.current.delete(el);
  }, []);

  // Detect which target we're hovering
  const getHoveredTarget = useCallback((): {
    el: HTMLElement;
    rect: TargetRect;
  } | null => {
    const mx = mousePos.current.x;
    const my = mousePos.current.y;

    for (const el of targetElements.current) {
      const r = el.getBoundingClientRect();
      // expand hit area slightly for magnetic feel
      const pad = 4;
      if (
        mx >= r.left - pad &&
        mx <= r.right + pad &&
        my >= r.top - pad &&
        my <= r.bottom + pad
      ) {
        const computed = getComputedStyle(el);
        return {
          el,
          rect: {
            x: r.left + r.width / 2,
            y: r.top + r.height / 2,
            width: r.width,
            height: r.height,
            borderRadius: computed.borderRadius || "12px",
          },
        };
      }
    }
    return null;
  }, []);

  // Animation loop
  useEffect(() => {
    const morphSmoothing = 0.18; // smoothing only when morphing onto a target
    const sizeSmoothing = 0.14;

    const animate = () => {
      const target = getHoveredTarget();

      let targetW: number;
      let targetH: number;
      let targetR: number;
      let targetOpacity: number;

      if (target) {
        // Magnetic: blend mouse pos toward element center
        const magneticX = lerp(mousePos.current.x, target.rect.x, 0.35);
        const magneticY = lerp(mousePos.current.y, target.rect.y, 0.35);
        // Smoothly morph position toward the magnetic target
        currentPos.current.x = lerp(currentPos.current.x, magneticX, morphSmoothing);
        currentPos.current.y = lerp(currentPos.current.y, magneticY, morphSmoothing);
        // Pad the element slightly for the "highlight" feel
        targetW = target.rect.width + 16;
        targetH = target.rect.height + 16;
        targetR = parseFloat(target.rect.borderRadius) + 4 || 14;
        targetOpacity = 0.12;

        if (hoveredEl.current !== target.el) {
          hoveredEl.current = target.el;
        }
      } else {
        // No target — follow mouse exactly, zero lag
        currentPos.current.x = mousePos.current.x;
        currentPos.current.y = mousePos.current.y;
        targetW = CURSOR_SIZE;
        targetH = CURSOR_SIZE;
        targetR = CURSOR_SIZE / 2;
        targetOpacity = 1;

        if (hoveredEl.current) {
          hoveredEl.current = null;
        }
      }

      // Smoothly interpolate size/shape (always interpolated for nice morph)
      currentSize.current.width = lerp(
        currentSize.current.width,
        targetW,
        sizeSmoothing
      );
      currentSize.current.height = lerp(
        currentSize.current.height,
        targetH,
        sizeSmoothing
      );
      currentRadius.current = lerp(currentRadius.current, targetR, sizeSmoothing);
      currentOpacity.current = lerp(currentOpacity.current, targetOpacity, sizeSmoothing);

      // Apply to DOM
      const cursor = cursorRef.current;
      if (cursor) {
        const left = currentPos.current.x - currentSize.current.width / 2;
        const top = currentPos.current.y - currentSize.current.height / 2;

        cursor.style.transform = `translate3d(${left}px, ${top}px, 0)`;
        cursor.style.width = `${currentSize.current.width}px`;
        cursor.style.height = `${currentSize.current.height}px`;
        cursor.style.borderRadius = `${currentRadius.current}px`;
        cursor.style.opacity = `${currentOpacity.current}`;
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [getHoveredTarget]);

  // Track mouse position
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      // On first entry or re-entry after leaving, snap all state instantly
      if (needsSnap.current) {
        needsSnap.current = false;
        hasReceivedMouseEvent.current = true;
        currentPos.current = { x: e.clientX, y: e.clientY };
        currentSize.current = { width: CURSOR_SIZE, height: CURSOR_SIZE };
        currentRadius.current = CURSOR_SIZE / 2;
        currentOpacity.current = 1;
      }
      if (!visible) setVisible(true);
    };

    const handleLeave = () => {
      mousePos.current = { x: -100, y: -100 };
      needsSnap.current = true; // next entry will snap
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [visible]);

  // Hide native cursor globally
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <IPadCursorContext.Provider value={{ registerElement, unregisterElement }}>
      {children}
      {/* The custom cursor element */}
      <div
        ref={cursorRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          borderRadius: CURSOR_SIZE / 2,
          backgroundColor: "rgba(100, 100, 100, 0.6)",
          backdropFilter: "blur(2px)",
          mixBlendMode: "difference" as const,
          willChange: "transform, width, height, border-radius, opacity",
          transition: "opacity 0.2s",
          opacity: visible ? 1 : 0,
        }}
      />
    </IPadCursorContext.Provider>
  );
}
