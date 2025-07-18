import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GameTracker Pro",
  description: "Your ultimate cross-platform gaming progress tracker. Track achievements, playtime, and progress across Xbox, PlayStation, Steam, Nintendo, and more.",
  keywords: "gaming, tracker, achievements, xbox, playstation, steam, nintendo, progress",
  authors: [{ name: "Christian Johnson" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
          {children}
        </div>
      </body>
    </html>
  );
}
