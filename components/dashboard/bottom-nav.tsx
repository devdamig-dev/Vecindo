"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HeartHandshake, Store, Wrench, ShoppingBag, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { FloatingCenterButton } from "@/components/dashboard/floating-center-button"
import type { CommercialModule } from "@/lib/commercial"

type Props = {
  homeHref: string
}

type PrimaryNavItem = {
  label: string
  shortLabel?: string
  href: string
  module: Extract<CommercialModule, "marketplace" | "services" | "commercialSpace" | "help">
  icon: LucideIcon
}

const primaryNavItems: PrimaryNavItem[] = [
  { label: "Mercado", href: "/dashboard/marketplace", module: "marketplace", icon: ShoppingBag },
  { label: "Servicios", href: "/dashboard/services", module: "services", icon: Wrench },
  { label: "Espacio comercial", shortLabel: "Espacio", href: "/dashboard/espacio-comercial", module: "commercialSpace", icon: Store },
  { label: "Ayuda", href: "/dashboard/ayuda", module: "help", icon: HeartHandshake },
]

function getActiveClass(module: PrimaryNavItem["module"]) {
  if (module === "marketplace") return "bg-emerald-500/10 text-emerald-700"
  if (module === "services") return "bg-sky-500/10 text-sky-700"
  if (module === "commercialSpace") return "bg-violet-500/10 text-violet-700"
  return "bg-rose-500/10 text-rose-700"
}

function getGlowClass(module: PrimaryNavItem["module"]) {
  if (module === "marketplace") return "drop-shadow-[0_4px_10px_rgba(16,185,129,0.25)]"
  if (module === "services") return "drop-shadow-[0_4px_10px_rgba(14,165,233,0.24)]"
  if (module === "commercialSpace") return "drop-shadow-[0_4px_10px_rgba(139,92,246,0.25)]"
  return "drop-shadow-[0_4px_10px_rgba(244,63,94,0.24)]"
}

function BottomNavLink({ item }: { item: PrimaryNavItem }) {
  const pathname = usePathname()
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[12px] font-medium text-slate-500 transition-all duration-200",
        isActive && cn(getActiveClass(item.module), getGlowClass(item.module), "scale-[1.08] -translate-y-[1px] font-semibold"),
      )}
    >
      <Icon className="h-4 w-4" />
      {item.shortLabel ?? item.label}
    </Link>
  )
}

export function BottomNav({ homeHref }: Props) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-card/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_rgba(2,6,23,0.08)] backdrop-blur">
      <div className="relative mx-auto grid max-w-2xl grid-cols-5 items-end px-3">
        <div className="col-span-2 grid grid-cols-2">
          {primaryNavItems.slice(0, 2).map((item) => (
            <BottomNavLink key={item.href} item={item} />
          ))}
        </div>

        <div className="relative h-10" aria-hidden />
        <FloatingCenterButton href={homeHref} />

        <div className="col-span-2 grid grid-cols-2">
          {primaryNavItems.slice(2).map((item) => (
            <BottomNavLink key={item.href} item={item} />
          ))}
        </div>
      </div>
    </nav>
  )
}
