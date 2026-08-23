import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: "GitDarpan | Your GitHub, Reflected",
  description: "Type a GitHub username. Get a beautiful report card — stars, languages, streaks & grades. No login needed.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-ink">{children}</body>
    </html>
  );
}
