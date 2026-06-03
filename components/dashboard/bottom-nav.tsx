"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Compass, Users, Wrench, Briefcase, User, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { hasBusinessActivity, hasServiceProviderActivity } from "@/lib/commercial"
import { FloatingCenterButton } from "@/components/dashboard/floating-center-button"

type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  activeColor: string
  activeGlow: string
  matchPrefixes?: string[]
}

const coreItems: NavItem[] = [
  {
    label: "Servicios",
    href: "/dashboard/services",
    icon: Wrench,
    activeColor: "bg-sky-500/8 text-sky-700 ring-1 ring-sky-100",
    activeGlow: "drop-shadow-[0_2px_6px_rgba(14,165,233,0.15)]",
    matchPrefixes: ["/dashboard/services"],
  },
  {
    label: "Descubrir",
    href: "/dashboard/descubrir",
    icon: Compass,
    activeColor: "bg-violet-500/8 text-violet-700 ring-1 ring-violet-100",
    activeGlow: "drop-shadow-[0_2px_6px_rgba(139,92,246,0.16)]",
    matchPrefixes: ["/dashboard/descubrir", "/dashboard/espacio-comercial", "/dashboard/comercios", "/dashboard/marketplace"],
  },
  {
    label: "Comunidad",
    href: "/dashboard/comunidad",
    icon: Users,
    activeColor: "bg-rose-500/8 text-rose-700 ring-1 ring-rose-100",
    activeGlow: "drop-shadow-[0_2px_6px_rgba(244,63,94,0.15)]",
    matchPrefixes: ["/dashboard/comunidad", "/dashboard/ayuda", "/dashboard/questions"],
  },
]

function BottomNavLink({ item }: { item: NavItem }) {
  const pathname = usePathname()
  const isActive =
    pathname === item.href ||
    (item.matchPrefixes ?? [item.href]).some(
      (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
    )
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[12px] font-medium text-slate-500 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/80 hover:text-slate-700 active:scale-95",
        isActive && cn(item.activeColor, item.activeGlow, "scale-[1.03] -translate-y-[1px] font-semibold"),
      )}
    >
      <Icon className="h-4 w-4" />
      {item.label}
    </Link>
  )
}

export function BottomNav({ homeHref }: { homeHref: string }) {
  const { auth } = useAuth()
  const pathname = usePathname()
  const hasBusiness = hasBusinessActivity(auth) || hasServiceProviderActivity(auth)

  const businessItem: NavItem = {
    label: "Mi negocio",
    href: "/dashboard/comercial",
    icon: Briefcase,
    activeColor: "bg-emerald-500/8 text-emerald-700 ring-1 ring-emerald-100",
    activeGlow: "drop-shadow-[0_2px_6px_rgba(16,185,129,0.15)]",
    matchPrefixes: ["/dashboard/comercial", "/dashboard/pro"],
  }

  const profileItem: NavItem = {
    label: "Perfil",
    href: "/dashboard/profile",
    icon: User,
    activeColor: "bg-slate-100/70 text-slate-700 ring-1 ring-slate-200",
    activeGlow: "drop-shadow-[0_2px_6px_rgba(100,116,139,0.12)]",
    matchPrefixes: ["/dashboard/profile"],
  }

  const rightItem = hasBusiness ? businessItem : profileItem
  const allItems = [...coreItems, rightItem]
  const leftItems = allItems.slice(0, 2)
  const rightItems = allItems.slice(2)

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
