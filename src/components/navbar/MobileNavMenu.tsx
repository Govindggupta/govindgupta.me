"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import Hamburger from "./Hamburger";
import type { NavigationItem } from "./navigationItems";
import useMenuDismiss from "./useMenuDismiss";

type MobileNavMenuProps = {
  items: NavigationItem[];
};

export default function MobileNavMenu({ items }: MobileNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useMenuDismiss({
    isOpen,
    onClose: () => setIsOpen(false),
    ref: containerRef,
  });

  return (
    <div ref={containerRef} className="relative flex h-9 items-center md:hidden">
      <Hamburger isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />

      <div
        className={`absolute right-0 top-11 z-[60] w-44 origin-top-right rounded-sm border border-border bg-background p-1.5 shadow-lg shadow-black/5 transition-all duration-200 dark:border-[#333] ${isOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-95 opacity-0"}`}
      >
        <nav className="flex flex-col gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-sm px-3 py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:bg-muted/40 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
