"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Clock,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import ru from "@/i18n/ru";
import { cn } from "@/lib/utils";

const navItems: ReadonlyArray<{
  href: string;
  label: string;
  icon: LucideIcon;
}> = [
  { href: "/", label: ru.nav.dashboard, icon: LayoutDashboard },
  { href: "/streams", label: ru.nav.streams, icon: Layers },
  { href: "/time", label: ru.nav.time, icon: Clock },
  { href: "/finances", label: ru.nav.finances, icon: Wallet },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5">
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
              "flex items-center gap-3 rounded-md px-3 py-1.5 text-sm transition-colors",
              isActive
                ? "bg-accent font-medium text-accent-foreground"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
            )}
          >
            <item.icon className="size-4" strokeWidth={1.5} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
