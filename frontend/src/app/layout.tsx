import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarNav } from "@/components/layout/sidebar-nav";
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
      <body className="flex min-h-full bg-background text-foreground">
        <aside className="w-56 shrink-0 border-r border-border bg-background p-4">
          <div className="mb-6 px-3 text-sm font-semibold tracking-tight text-foreground">
            {ru.app.title}
          </div>
          <SidebarNav />
        </aside>
        <main className="flex-1 bg-background p-6">{children}</main>
      </body>
    </html>
  );
}
