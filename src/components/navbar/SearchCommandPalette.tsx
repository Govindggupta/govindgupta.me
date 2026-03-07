"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import logoFilledLight from "@/logos/black_filled.svg";
import logoFilledDark from "@/logos/white_filled.svg";
import VerticalBar from "../ui/VerticalBar";

type SearchCommandPaletteProps = {
  isOpen: boolean;
  onClose: () => void;
};

type PaletteItem = {
  label: string;
  href: string;
  badge: string;
};

type PaletteSection = {
  title: string;
  items: PaletteItem[];
};

const paletteSections: PaletteSection[] = [
  {
    title: "Menu",
    items: [
      { label: "Home", href: "/", badge: "01" },
      { label: "About", href: "/about", badge: "02" },
      { label: "Projects", href: "/projects", badge: "03" },
    ],
  },
  {
    title: "Pages",
    items: [
      { label: "Resume", href: "/resume", badge: "04" },
      { label: "Check", href: "/check", badge: "05" },
    ],
  },
];

const PALETTE_ANIMATION_MS = 100;

export const keycapClassName =
  "inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-border bg-muted/45 px-1.5 text-[11px] font-medium text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_1px_2px_rgba(15,23,42,0.08)] dark:border-[#333] dark:bg-muted/80 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.45)]";

export default function SearchCommandPalette({
  isOpen,
  onClose,
}: SearchCommandPaletteProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isRendered, setIsRendered] = useState(isOpen);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatItems = useMemo(
    () => paletteSections.flatMap((section) => section.items),
    [],
  );
  const itemCount = flatItems.length;

  useEffect(() => {
    if (isOpen) {
      if (isRendered) {
        return;
      }

      const frame = window.requestAnimationFrame(() => {
        setIsRendered(true);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    if (!isRendered) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsRendered(false);
    }, PALETTE_ANIMATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen, isRendered]);

  useEffect(() => {
    if (!isOpen || !isRendered) {
      return;
    }

    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, [isOpen, isRendered]);

  const goToItem = useCallback((index: number) => {
    const item = flatItems[index];

    if (!item) {
      return;
    }

    router.push(item.href);
    onClose();
  }, [flatItems, onClose, router]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleGlobalPaletteKeys(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowDown") {
        if (itemCount === 0) {
          return;
        }

        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % itemCount);
        return;
      }

      if (event.key === "ArrowUp") {
        if (itemCount === 0) {
          return;
        }

        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount);
        return;
      }

      if (event.key === "Enter") {
        if (itemCount === 0) {
          return;
        }

        event.preventDefault();
        goToItem(activeIndex);
      }
    }

    document.addEventListener("keydown", handleGlobalPaletteKeys);

    return () => {
      document.removeEventListener("keydown", handleGlobalPaletteKeys);
    };
  }, [activeIndex, goToItem, isOpen, itemCount, onClose]);

  if (!isOpen && !isRendered) {
    return null;
  }

  const stopClose: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className={`fixed inset-0 z-[90] px-3 py-4 sm:p-6 ${isOpen ? "animate-[palette-fade-in_100ms_ease-out]" : "animate-[palette-fade-out_100ms_ease-out]"}`}
      onClick={onClose}
    >
      <div className="flex h-full items-start justify-center pt-[8vh] sm:items-center sm:pt-0">
        <div
          className={`w-full max-w-[640px] overflow-hidden rounded-2xl border border-border bg-background shadow-[0_24px_60px_-32px_rgba(0,0,0,0.75)] ring-1 ring-border/45 dark:border-[#333] dark:bg-card ${isOpen ? "animate-[palette-pop-in_100ms_cubic-bezier(0.16,1,0.3,1)]" : "animate-[palette-pop-out_100ms_cubic-bezier(0.16,1,0.3,1)]"}`}
          onClick={stopClose}
        >
          <div className="flex h-12 items-center gap-3 border-b border-border px-4 dark:border-[#333]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>

            <input
              ref={inputRef}
              type="text"
              autoFocus
              placeholder="Type a command or search..."
              className="h-full flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/85 outline-none"
            />

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-muted/40 hover:text-foreground"
              aria-label="Close search"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 6 18 18" />
                <path d="m18 6-12 12" />
              </svg>
            </button>
          </div>

          <div className="max-h-[52vh] overflow-y-auto px-3 py-3">
            {paletteSections.map((section, sectionIndex) => {
              let sectionOffset = 0;

              for (let i = 0; i < sectionIndex; i += 1) {
                sectionOffset += paletteSections[i]?.items.length ?? 0;
              }

              return (
                <section key={section.title} className={sectionIndex === 0 ? "" : "mt-4"}>
                  <h3 className="px-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {section.title}
                  </h3>

                  <div className="mt-2 space-y-1">
                    {section.items.map((item, itemIndex) => {
                      const absoluteIndex = sectionOffset + itemIndex;
                      const isHighlighted = absoluteIndex === activeIndex;

                      return (
                        <button
                          key={item.label}
                          type="button"
                          onMouseEnter={() => setActiveIndex(absoluteIndex)}
                          onClick={() => goToItem(absoluteIndex)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[15px] leading-none ${isHighlighted ? "bg-muted/45 text-foreground" : "text-foreground/90 hover:bg-muted/30"}`}
                        >
                          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted/35 px-1 text-[10px] text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] dark:border-[#333] dark:bg-muted/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                            {item.badge}
                          </span>
                          <span className="font-medium">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground dark:border-[#333]">
            <div className="inline-flex items-center gap-2">
              <span className="relative inline-flex h-7 w-7 overflow-hidden rounded-sm">
                <Image
                  src={logoFilledLight}
                  alt="Govind logo"
                  width={20}
                  height={20}
                  className="theme-logo-light absolute inset-0 h-full w-full"
                />
                <Image
                  src={logoFilledDark}
                  alt="Govind logo"
                  width={20}
                  height={20}
                  className="theme-logo-dark absolute inset-0 h-full w-full"
                />
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2">
                <span className="text-foreground">Go to Page</span>
                <kbd className={keycapClassName}>
                  ↵
                </kbd>
              </span>
              <VerticalBar />
              <span className="inline-flex items-center gap-2">
                Exit
                <kbd className={keycapClassName}>
                  Esc
                </kbd>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
