"use client";

import { useCallback, useEffect, useState } from "react";
import SearchCommandPalette, { keycapClassName } from "./SearchCommandPalette";

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false);
  const closePalette = useCallback(() => setIsOpen(false), []);
  const openPalette = useCallback(() => setIsOpen(true), []);
  const togglePalette = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    function handleGlobalShortcuts(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        togglePalette();
      }
    }

    document.addEventListener("keydown", handleGlobalShortcuts);

    return () => {
      document.removeEventListener("keydown", handleGlobalShortcuts);
    };
  }, [togglePalette]);

  return (
    <>
      <button
        type="button"
        className="inline-flex h-9 shrink-0 items-center gap-1 rounded-md border border-border bg-muted/20 px-2 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-transform duration-100 active:scale-[0.98]"
        onClick={openPalette}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-[1.375rem] w-[1.375rem]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.5 4.5" />
        </svg>
        <span className="sm:hidden">Search</span>
        <span className="bg-accent hidden items-center rounded-sm border border-border px-1 py-0.5 text-[10px] tracking-[0.14em] text-foreground sm:inline-flex lg:hidden">
          Ctrl K
        </span>
        {["Ctrl", "K"].map((key) => (
          <span key={key} className="hidden lg:inline-flex">
            <span className={keycapClassName}>{key}</span>
          </span>
        ))}
      </button>

      <SearchCommandPalette isOpen={isOpen} onClose={closePalette} />
    </>
  );
}
