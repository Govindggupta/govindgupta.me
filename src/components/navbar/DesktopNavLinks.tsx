import Link from "next/link";
import type { NavigationItem } from "./navigationItems";

type DesktopNavLinksProps = {
  items: NavigationItem[];
};

export default function DesktopNavLinks({ items }: DesktopNavLinksProps) {
  return (
    <div className="no-scrollbar hidden items-center gap-2 overflow-x-auto md:flex">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="inline-flex h-9 shrink-0 items-center rounded-sm border border-transparent px-3.5 text-[13px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:border-border hover:text-foreground"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
