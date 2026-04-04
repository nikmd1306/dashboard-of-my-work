"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ru from "@/i18n/ru";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: ru.nav.dashboard },
  { href: "/streams", label: ru.nav.streams },
  { href: "/time", label: ru.nav.time },
  { href: "/finances", label: ru.nav.finances },
] as const;

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-accent font-medium text-accent-foreground"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
