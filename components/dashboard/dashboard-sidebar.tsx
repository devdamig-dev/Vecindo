"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { getUserPrimaryRole, hasBusinessActivity, hasServiceProviderActivity } from "@/lib/commercial"
import {
  MapPinned,
  LayoutDashboard,
  Compass,
  Users,
  Settings,
  LogOut,
  X,
  Menu,
  Briefcase,
  Store,
  CreditCard,
  Bookmark,
  Info,
  BarChart3,
  User,
  Wrench,
  Package,
  Star,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react"
import { useState } from "react"

type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  activeColor?: string
  matchPrefixes?: string[]
}

const mainNavItems: NavItem[] = [
  {
    label: "Inicio",
    href: "/dashboard",
    icon: LayoutDashboard,
    matchPrefixes: [],
  },
  {
    label: "Servicios",
    href: "/dashboard/services",
    icon: Wrench,
    activeColor: "bg-sky-600 text-white",
    matchPrefixes: ["/dashboard/services"],
  },
  {
    label: "Descubrir",
    href: "/dashboard/descubrir",
    icon: Compass,
    activeColor: "bg-violet-600 text-white",
    matchPrefixes: ["/dashboard/descubrir", "/dashboard/espacio-comercial", "/dashboard/comercios", "/dashboard/marketplace"],
  },
  {
    label: "Comunidad",
    href: "/dashboard/comunidad",
    icon: Users,
    activeColor: "bg-rose-600 text-white",
    matchPrefixes: ["/dashboard/comunidad", "/dashboard/ayuda", "/dashboard/questions"],
  },
]

const myBusinessItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/comercial", icon: BarChart3, activeColor: "bg-emerald-600 text-white" },
  { label: "Catálogo", href: "/dashboard/comercial", icon: Package, activeColor: "bg-emerald-600 text-white" },
  { label: "Pedidos", href: "/dashboard/comercial", icon: ShoppingBag, activeColor: "bg-emerald-600 text-white" },
  { label: "Reputación", href: "/dashboard/pro", icon: Star, activeColor: "bg-emerald-600 text-white" },
  { label: "Estadísticas", href: "/dashboard/pro", icon: BarChart3, activeColor: "bg-emerald-600 text-white" },
]

const secondaryNavItems: NavItem[] = [
  { label: "Guardados", href: "/dashboard/guardados", icon: Bookmark },
  { label: "Información útil", href: "/dashboard/informacion-util", icon: Info },
  { label: "Planes", href: "/dashboard/suscripciones", icon: CreditCard },
  { label: "Mi perfil", href: "/dashboard/profile", icon: User },
]

function getRoleLabel(role: ReturnType<typeof getUserPrimaryRole>) {
  if (role === "hybrid") return "Servicios + negocio"
  if (role === "business") return "Negocio activo"
  if (role === "services") return "Servicios activos"
  return "Vecino VEZI"
}

function SidebarLink({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const pathname = usePathname()
  const isExact = pathname === item.href
  const prefixes = item.matchPrefixes ?? [item.href]
  const isActive =
    item.href === "/dashboard"
      ? isExact
      : isExact || prefixes.some((p) => p && (pathname === p || pathname.startsWith(p + "/")))
  const Icon = item.icon
  const activeClass = item.activeColor ?? "bg-sidebar-primary text-sidebar-primary-foreground"

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        isActive ? activeClass : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
      <span className="flex-1">{item.label}</span>
    </Link>
  )
}

export function DashboardSidebar() {
  const [open, setOpen] = useState(false)
  const { auth } = useAuth()
  const role = getUserPrimaryRole(auth)
  const hasBusiness = hasBusinessActivity(auth)
  const hasServices = hasServiceProviderActivity(auth)
  const close = () => setOpen(false)

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
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={close} />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-sidebar-border px-6 py-5">
          <Link href="/dashboard" className="flex items-center gap-2" onClick={close}>
            <MapPinned className="h-6 w-6 text-sidebar-primary" />
            <span className="text-lg font-bold tracking-tight">VEZI</span>
          </Link>
          <button className="text-sidebar-foreground lg:hidden" onClick={close} aria-label="Cerrar navegación">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 py-3">
          <div className="rounded-xl bg-sidebar-accent px-3 py-3">
            <p className="text-xs text-sidebar-foreground/60">Zona</p>
            <p className="text-sm font-semibold">Hudson – Berazategui</p>
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-xl bg-sidebar-accent/50 px-3 py-2.5">
            {hasBusiness ? <Store className="h-3.5 w-3.5 text-sidebar-primary" /> : <User className="h-3.5 w-3.5 text-sidebar-primary" />}
            <span className="text-xs font-medium text-sidebar-foreground/80">{getRoleLabel(role)}</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wide text-sidebar-foreground/45">Red local</p>
          <ul className="flex flex-col gap-1">
            {mainNavItems.map((item) => (
              <li key={item.href + item.label}>
                <SidebarLink item={item} onNavigate={close} />
              </li>
            ))}
          </ul>

          {(hasBusiness || hasServices) && (
            <>
              <p className="px-3 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-wide text-sidebar-foreground/45">Mi negocio</p>
              <ul className="flex flex-col gap-1">
                {myBusinessItems.map((item) => (
                  <li key={item.href + item.label}>
                    <SidebarLink item={item} onNavigate={close} />
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="px-3 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-wide text-sidebar-foreground/45">Mi cuenta</p>
          <ul className="flex flex-col gap-1">
            {secondaryNavItems.map((item) => (
              <li key={item.href}>
                <SidebarLink item={item} onNavigate={close} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border px-3 py-4">
          <Link
            href="/dashboard/settings"
            onClick={close}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
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
