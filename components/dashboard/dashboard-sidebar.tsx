"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { getUserPrimaryRole, getVisibleNavItems, isResident, type CommercialModule } from "@/lib/commercial"
import {
  MapPinned,
  LayoutDashboard,
  Search,
  ShoppingBag,
  MessageCircle,
  Settings,
  LogOut,
  X,
  Menu,
  Briefcase,
  ShieldCheck,
  Store,
  CreditCard,
  Bookmark,
  Heart,
  Info,
  BarChart3,
  User,
  type LucideIcon,
} from "lucide-react"
import { useState } from "react"

const iconByModule: Record<CommercialModule, LucideIcon> = {
  home: LayoutDashboard,
  professionalDashboard: BarChart3,
  marketplace: ShoppingBag,
  services: Search,
  commercialSpace: Store,
  help: Heart,
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
  if (module === "services" || module === "serviceManagement" || module === "professionalDashboard") return "bg-sky-600 text-white"
  if (module === "questions") return "bg-violet-600 text-white"
  if (module === "marketplace") return "bg-emerald-600 text-white"
  if (module === "help") return "bg-rose-600 text-white"
  if (module === "commercialSpace") return "bg-amber-600 text-white"
  if (module === "myBusiness") return "bg-sidebar-primary text-sidebar-primary-foreground"
  return "bg-sidebar-primary text-sidebar-primary-foreground"
}

function getRoleLabel(role: ReturnType<typeof getUserPrimaryRole>) {
  if (role === "resident_business") return "Residente + negocio"
  if (role === "resident") return "Residente"
  if (role === "external_business") return "Comercio externo"
  return "Prestador de servicios"
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { auth } = useAuth()
  const residentUser = isResident(auth)
  const role = getUserPrimaryRole(auth)
  const navItems = getVisibleNavItems(auth)
  const homeHref = navItems[0]?.href ?? (residentUser ? "/dashboard" : "/dashboard/pro")

  return (
    <>
      <button
        className="fixed left-4 top-4 z-50 rounded-xl bg-sidebar p-2.5 text-sidebar-foreground shadow-sm lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Abrir navegación"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-sidebar-border px-6 py-5">
          <Link href={homeHref} className="flex items-center gap-2">
            <MapPinned className="h-6 w-6 text-sidebar-primary" />
            <span className="text-lg font-bold tracking-tight">VEZI</span>
          </Link>
          <button className="text-sidebar-foreground lg:hidden" onClick={() => setOpen(false)} aria-label="Cerrar navegación">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 py-3">
          <div className="rounded-xl bg-sidebar-accent px-3 py-3">
            <p className="text-xs text-sidebar-foreground/60">Zona</p>
            <p className="text-sm font-semibold">Hudson – Berazategui</p>
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-xl bg-sidebar-accent/50 px-3 py-2.5">
            {residentUser ? <ShieldCheck className="h-3.5 w-3.5 text-sidebar-primary" /> : <Briefcase className="h-3.5 w-3.5 text-sidebar-primary" />}
            <span className="text-xs font-medium text-sidebar-foreground/80">{getRoleLabel(role)}</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
              const Icon = iconByModule[item.module]
              return (
                <li key={`${item.module}-${item.href}`}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive ? getActiveClass(item.module) : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1">{item.label}</span>
                    {item.access === "preview" && <span className="rounded-full bg-sidebar-accent px-2 py-0.5 text-[10px] uppercase tracking-wide text-sidebar-foreground/60">Preview</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border px-3 py-4">
          <Link
            href="/dashboard/settings"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              pathname === "/dashboard/settings" ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            <Settings className="h-4 w-4" />
            Configuración
          </Link>
          <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground">
            <LogOut className="h-4 w-4" />
            Salir
          </Link>
        </div>
      </aside>
    </>
  )
}
