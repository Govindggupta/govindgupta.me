import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { cascadiaCode } from "./fonts";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });



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
        <div className="relative z-10 mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22 p-2 min-h-screen ">
          {children}
        </div>
      </body>
    </html>
  );
}
