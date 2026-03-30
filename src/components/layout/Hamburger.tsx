type HamburgerProps = {
	isOpen: boolean
	onClick: () => void
	ariaControls?: string
}

export default function Hamburger({ isOpen, onClick, ariaControls }: HamburgerProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`relative flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_8px_rgba(0,0,0,0.08)] focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_2px_10px_rgba(0,0,0,0.32)] ${isOpen ? "bg-background-alt" : "bg-background-alt/80 hover:bg-background-alt"}`}
			aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
			aria-expanded={isOpen}
			aria-controls={ariaControls}
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
	)
}
