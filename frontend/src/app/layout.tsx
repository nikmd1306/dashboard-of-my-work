import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/layout/top-nav";
import ru from "@/i18n/ru";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: ru.app.title,
  description: ru.app.title,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-8 border-b border-border bg-background px-6">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {ru.app.title}
          </span>
          <TopNav />
        </header>
        <main className="flex flex-1 flex-col bg-card px-8 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
