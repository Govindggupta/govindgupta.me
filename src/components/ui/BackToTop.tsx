"use client"

export function BackToTop() {
  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-xs text-muted transition-colors duration-200 hover:text-foreground"
    >
      Back to top ↑
    </button>
  )
}
