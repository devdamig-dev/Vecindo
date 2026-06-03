"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HandHelping, Wrench, Store, Sparkles, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { FloatingCenterButton } from "@/components/dashboard/floating-center-button"

type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  activeColor: string
  activeGlow: string
  matchPrefixes: string[]
}

const navItems: NavItem[] = [
  {
    label: "Necesito",
    href: "/dashboard/necesito",
    icon: HandHelping,
    activeColor: "bg-amber-500/8 text-amber-700 ring-1 ring-amber-100",
    activeGlow: "drop-shadow-[0_2px_6px_rgba(245,158,11,0.18)]",
    matchPrefixes: ["/dashboard/necesito"],
  },
  {
    label: "Servicios",
    href: "/dashboard/servicios",
    icon: Wrench,
    activeColor: "bg-sky-500/8 text-sky-700 ring-1 ring-sky-100",
    activeGlow: "drop-shadow-[0_2px_6px_rgba(14,165,233,0.15)]",
    matchPrefixes: ["/dashboard/servicios", "/dashboard/services"],
  },
  {
    label: "Comercios",
    href: "/dashboard/comercios",
    icon: Store,
    activeColor: "bg-violet-500/8 text-violet-700 ring-1 ring-violet-100",
    activeGlow: "drop-shadow-[0_2px_6px_rgba(139,92,246,0.16)]",
    matchPrefixes: ["/dashboard/comercios"],
  },
  {
    label: "Emprendim.",
    href: "/dashboard/emprendimientos",
    icon: Sparkles,
    activeColor: "bg-emerald-500/8 text-emerald-700 ring-1 ring-emerald-100",
    activeGlow: "drop-shadow-[0_2px_6px_rgba(16,185,129,0.15)]",
    matchPrefixes: ["/dashboard/emprendimientos"],
  },
]

function BottomNavLink({ item }: { item: NavItem }) {
  const pathname = usePathname()
  const isActive = item.matchPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
  )
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium text-slate-500 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/80 hover:text-slate-700 active:scale-95",
        isActive && cn(item.activeColor, item.activeGlow, "scale-[1.03] -translate-y-[1px] font-semibold"),
      )}
    >
      <Icon className="h-4 w-4" />
      {item.label}
    </Link>
  )
}

export function BottomNav({ homeHref }: { homeHref: string }) {
  const leftItems = navItems.slice(0, 2)
  const rightItems = navItems.slice(2)

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/70 bg-gradient-to-t from-white via-white/95 to-white/90 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <div className="relative mx-auto grid max-w-2xl grid-cols-5 items-end px-3">
        <div className="col-span-2 grid grid-cols-2">
          {leftItems.map((item) => (
            <BottomNavLink key={item.href} item={item} />
          ))}
        </div>

        <div className="relative h-10" aria-hidden />
        <FloatingCenterButton href={homeHref} />

        <div className="col-span-2 grid grid-cols-2">
          {rightItems.map((item) => (
            <BottomNavLink key={item.href} item={item} />
          ))}
        </div>
      </div>
    </nav>
  )
}
