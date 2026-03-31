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
			className={`relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-xl text-foreground transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none ${
				isOpen
					? "bg-background-alt dark:bg-white/14"
					: "bg-transparent hover:bg-background-alt active:bg-neutral-200 dark:hover:bg-white/10 dark:active:bg-white/14"
			}`}
			aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
			aria-expanded={isOpen}
			aria-controls={ariaControls}
		>
			<span
				aria-hidden="true"
				className={`absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-foreground transition-transform duration-200 ${isOpen ? "translate-y-0 rotate-45" : "-translate-y-1 rotate-0"}`}
			/>
			<span
				aria-hidden="true"
				className={`absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-foreground transition-transform duration-200 ${isOpen ? "translate-y-0 -rotate-45" : "translate-y-1 rotate-0"}`}
			/>
		</button>
	)
}
