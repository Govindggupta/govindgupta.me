import type { Metadata } from "next";
import { cascadiaCode } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Govind Gupta | Developer Portfolio",
  description:
    "Portfolio website for Govind Gupta with projects, experience, GitHub activity, and contact details.",
  icons: {
    icon: "/icon.svg",
  },
};

const themeScript = `
  (() => {
    const root = document.documentElement;
    const storedTheme = window.localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : systemPrefersDark
          ? "dark"
          : "light";

    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${cascadiaCode.variable} relative min-h-screen bg-background text-foreground antialiased`}
      >
        <div className="relative z-10 mx-auto min-h-screen max-w-6xl px-2 sm:px-4">
          {children}
        </div>
      </body>
    </html>
  );
}
