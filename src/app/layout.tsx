import type { Metadata } from "next";
import { cascadiaCode } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Govind Portfolio",
  description: "Created by Govind Gupta",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cascadiaCode.variable} relative min-h-screen bg-black antialiased`}>
        <div className="relative z-10 mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22 px-2 min-h-screen ">
          {children}
        </div>
      </body>
    </html>
  );
}
