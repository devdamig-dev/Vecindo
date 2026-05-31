"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HeartHandshake, Store, Wrench, ShoppingBag, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { FloatingCenterButton } from "@/components/dashboard/floating-center-button"
import { canAccessModule, type CommercialModule } from "@/lib/commercial"

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
  { label: "Servicios", href: "/dashboard/services", module: "services", icon: Wrench },
  { label: "Espacio comercial", shortLabel: "Espacio", href: "/dashboard/espacio-comercial", module: "commercialSpace", icon: Store },
  { label: "Ayuda", href: "/dashboard/ayuda", module: "help", icon: HeartHandshake },
  { label: "Mercado", href: "/dashboard/marketplace", module: "marketplace", icon: ShoppingBag },
]

function getActiveClass(module: PrimaryNavItem["module"]) {
  if (module === "marketplace") return "bg-slate-100/70 text-slate-700 ring-1 ring-slate-200"
  if (module === "services") return "bg-sky-500/8 text-sky-700 ring-1 ring-sky-100"
  if (module === "commercialSpace") return "bg-violet-500/8 text-violet-700 ring-1 ring-violet-100"
  return "bg-rose-500/8 text-rose-700 ring-1 ring-rose-100"
}

function getGlowClass(module: PrimaryNavItem["module"]) {
  if (module === "marketplace") return "drop-shadow-[0_2px_6px_rgba(100,116,139,0.12)]"
  if (module === "services") return "drop-shadow-[0_2px_6px_rgba(14,165,233,0.15)]"
  if (module === "commercialSpace") return "drop-shadow-[0_2px_6px_rgba(139,92,246,0.16)]"
  return "drop-shadow-[0_2px_6px_rgba(244,63,94,0.15)]"
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
        "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[12px] font-medium text-slate-500 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/80 hover:text-slate-700 active:scale-95",
        isActive && cn(getActiveClass(item.module), getGlowClass(item.module), "scale-[1.03] -translate-y-[1px] font-semibold"),
      )}
    >
      <Icon className="h-4 w-4" />
      {item.shortLabel ?? item.label}
    </Link>
  )
}

export function BottomNav({ homeHref }: Props) {
  const { auth } = useAuth()
  const visibleItems = primaryNavItems.filter((item) => canAccessModule(auth, item.module))
  const midpoint = Math.ceil(visibleItems.length / 2)
  const leftItems = visibleItems.slice(0, midpoint)
  const rightItems = visibleItems.slice(midpoint)

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/70 bg-gradient-to-t from-white via-white/95 to-white/90 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <div className="relative mx-auto grid max-w-2xl grid-cols-5 items-end px-3">
        <div className={cn("col-span-2 grid", leftItems.length <= 1 ? "grid-cols-1" : "grid-cols-2")}>
          {leftItems.map((item) => (
            <BottomNavLink key={item.href} item={item} />
          ))}
        </div>

        <div className="relative h-10" aria-hidden />
        <FloatingCenterButton href={homeHref} />

        <div className={cn("col-span-2 grid", rightItems.length <= 1 ? "grid-cols-1" : "grid-cols-2")}>
          {rightItems.map((item) => (
            <BottomNavLink key={item.href} item={item} />
          ))}
        </div>
      </div>
    </nav>
  )
}
