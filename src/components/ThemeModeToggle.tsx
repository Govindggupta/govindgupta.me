"use client";

import { useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

const THEME_TOGGLE_SOUND_URL = "/click.mp3";

function resolveTheme(): Theme {
  if (typeof document === "undefined") {
    return "dark";
  }

  const currentTheme = document.documentElement.dataset.theme;

  if (currentTheme === "light" || currentTheme === "dark") {
    return currentTheme;
  }

  const storedTheme = window.localStorage.getItem("theme");

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem("theme", theme);
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2.5v2.5" />
      <path d="M12 19v2.5" />
      <path d="m4.9 4.9 1.8 1.8" />
      <path d="m17.3 17.3 1.8 1.8" />
      <path d="M2.5 12H5" />
      <path d="M19 12h2.5" />
      <path d="m4.9 19.1 1.8-1.8" />
      <path d="m17.3 6.7 1.8-1.8" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 13.2A8.8 8.8 0 1 1 10.8 3a7 7 0 1 0 10.2 10.2Z" />
    </svg>
  );
}

export default function ThemeModeToggle() {
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const [theme, setTheme] = useState<Theme>(() => resolveTheme());

  useEffect(() => {
    const clickSound = new Audio(THEME_TOGGLE_SOUND_URL);
    clickSound.preload = "auto";
    clickSoundRef.current = clickSound;

    return () => {
      clickSound.pause();
      clickSoundRef.current = null;
    };
  }, []);

  function toggleTheme() {
    const currentTheme = resolveTheme();
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    const clickSound = clickSoundRef.current;

    if (clickSound) {
      clickSound.currentTime = 0;
      void clickSound.play().catch(() => {});
    }

    applyTheme(nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex h-8 w-12 shrink-0 rounded-full border border-border bg-muted/40 transition-colors duration-200 hover:border-foreground"
      aria-label="Toggle dark and light theme"
      title="Toggle dark and light theme"
    >
      <span className="sr-only">Toggle dark and light theme</span>
      <span className="theme-toggle-thumb absolute left-1 top-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-200">
        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}
