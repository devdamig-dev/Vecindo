"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, CreditCard, HeartHandshake, Home, Info, MessageCircle, Settings, Store, User, Wrench, ShoppingBag, Bookmark, BarChart3, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { FloatingCenterButton } from "@/components/dashboard/floating-center-button"
import { useAuth } from "@/lib/auth-context"
import { getVisibleNavItems, isResident, type CommercialModule } from "@/lib/commercial"

type Props = {
  homeHref: string
}

const iconByModule: Record<CommercialModule, LucideIcon> = {
  home: Home,
  professionalDashboard: BarChart3,
  marketplace: ShoppingBag,
  services: Wrench,
  commercialSpace: Store,
  help: HeartHandshake,
  questions: MessageCircle,
  saved: Bookmark,
  usefulInfo: Info,
  subscriptions: CreditCard,
  myBusiness: Briefcase,
  serviceManagement: BarChart3,
  profile: User,
  settings: Settings,
}

function getActiveClass(module: CommercialModule) {
  if (module === "marketplace") return "bg-emerald-500/10 text-emerald-700"
  if (module === "services" || module === "serviceManagement" || module === "professionalDashboard") return "bg-sky-500/10 text-sky-700"
  if (module === "commercialSpace") return "bg-violet-500/10 text-violet-700"
  if (module === "help") return "bg-rose-500/10 text-rose-700"
  if (module === "myBusiness") return "bg-amber-500/10 text-amber-700"
  return "bg-slate-500/10 text-slate-700"
}

function getGlowClass(module: CommercialModule) {
  if (module === "marketplace") return "drop-shadow-[0_4px_10px_rgba(16,185,129,0.25)]"
  if (module === "services" || module === "serviceManagement" || module === "professionalDashboard") return "drop-shadow-[0_4px_10px_rgba(14,165,233,0.24)]"
  if (module === "commercialSpace") return "drop-shadow-[0_4px_10px_rgba(139,92,246,0.25)]"
  if (module === "help") return "drop-shadow-[0_4px_10px_rgba(244,63,94,0.24)]"
  if (module === "myBusiness") return "drop-shadow-[0_4px_10px_rgba(245,158,11,0.24)]"
  return ""
}

export function BottomNav({ homeHref }: Props) {
  const pathname = usePathname()
  const { auth } = useAuth()
  const navItems = getVisibleNavItems(auth).filter((item) => item.priority === "primary").slice(0, 4)
  const resolvedHomeHref = isResident(auth) ? homeHref : getVisibleNavItems(auth)[0]?.href ?? homeHref

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-card/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_rgba(2,6,23,0.08)] backdrop-blur">
      <div className="relative mx-auto grid max-w-2xl grid-cols-5 items-end px-3">
        <div className="col-span-2 grid grid-cols-2">
          {navItems.slice(0, 2).map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            const Icon = iconByModule[item.module]
            return (
              <Link
                key={`${item.module}-${item.href}`}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[12px] font-medium text-slate-500 transition-all duration-200",
                  isActive && cn(getActiveClass(item.module), getGlowClass(item.module), "scale-[1.08] -translate-y-[1px] font-semibold")
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label.replace("Gestionar servicios", "Gestionar")}
                {item.access === "preview" && <span className="text-[9px] uppercase tracking-wide text-muted-foreground">Preview</span>}
              </Link>
            )
          })}
        </div>

        <div className="relative h-10" aria-hidden />
        <FloatingCenterButton href={resolvedHomeHref} />

        <div className="col-span-2 grid grid-cols-2">
          {navItems.slice(2).map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            const Icon = iconByModule[item.module]
            return (
              <Link
                key={`${item.module}-${item.href}`}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[12px] font-medium text-slate-500 transition-all duration-200",
                  isActive && cn(getActiveClass(item.module), getGlowClass(item.module), "scale-[1.08] -translate-y-[1px] font-semibold")
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label.replace("Espacio comercial", "Espacio").replace("Mi negocio", "Negocio")}
                {item.access === "preview" && <span className="text-[9px] uppercase tracking-wide text-muted-foreground">Preview</span>}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
