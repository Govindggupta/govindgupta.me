type HamburgerProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function Hamburger({ isOpen, onClick }: HamburgerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm transition-colors duration-200 ${isOpen ? "bg-muted/40" : "hover:bg-muted/40"}`}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
    >
      <span
        aria-hidden="true"
        className={`absolute left-1/2 top-1/2 h-0.5 w-[18px] -translate-x-1/2 rounded-full bg-foreground transition-transform duration-200 ${isOpen ? "translate-y-0 rotate-45" : "-translate-y-1 rotate-0"}`}
      />
      <span
        aria-hidden="true"
        className={`absolute left-1/2 top-1/2 h-0.5 w-[18px] -translate-x-1/2 rounded-full bg-foreground transition-transform duration-200 ${isOpen ? "translate-y-0 -rotate-45" : "translate-y-1 rotate-0"}`}
      />
    </button>
  );
}
