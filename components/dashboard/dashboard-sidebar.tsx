"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { getUserPrimaryRole, hasBusinessActivity, hasServiceProviderActivity } from "@/lib/commercial"
import {
  MapPinned, Newspaper, HandHelping, Wrench, Store, Sparkles,
  Briefcase, Package, ShoppingBag, Star, BarChart3,
  Bookmark, Info, CreditCard, User, Settings, LogOut, X, Menu,
  type LucideIcon,
} from "lucide-react"
import { useState } from "react"

type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  activeColor?: string
  exactMatch?: boolean
  matchPrefixes?: string[]
}

const exploreItems: NavItem[] = [
  { label: "Novedades", href: "/dashboard", icon: Newspaper, exactMatch: true },
  { label: "Necesito", href: "/dashboard/necesito", icon: HandHelping, activeColor: "bg-amber-600 text-white", matchPrefixes: ["/dashboard/necesito"] },
  { label: "Servicios", href: "/dashboard/servicios", icon: Wrench, activeColor: "bg-sky-600 text-white", matchPrefixes: ["/dashboard/servicios", "/dashboard/services"] },
  { label: "Comercios", href: "/dashboard/comercios", icon: Store, activeColor: "bg-violet-600 text-white", matchPrefixes: ["/dashboard/comercios"] },
  { label: "Emprendimientos", href: "/dashboard/emprendimientos", icon: Sparkles, activeColor: "bg-emerald-600 text-white", matchPrefixes: ["/dashboard/emprendimientos"] },
]

const businessItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/comercial", icon: BarChart3, activeColor: "bg-rose-600 text-white" },
  { label: "Catálogo", href: "/dashboard/comercial", icon: Package, activeColor: "bg-rose-600 text-white" },
  { label: "Pedidos", href: "/dashboard/comercial", icon: ShoppingBag, activeColor: "bg-rose-600 text-white" },
  { label: "Reputación", href: "/dashboard/pro", icon: Star, activeColor: "bg-rose-600 text-white" },
  { label: "Estadísticas", href: "/dashboard/pro", icon: BarChart3, activeColor: "bg-rose-600 text-white" },
]

const accountItems: NavItem[] = [
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
  const prefixes = item.matchPrefixes ?? [item.href]
  const isActive = item.exactMatch
    ? pathname === item.href
    : prefixes.some((p) => pathname === p || pathname.startsWith(p + "/"))
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
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1 leading-none">{item.label}</span>
    </Link>
  )
}

export function DashboardSidebar() {
  const [open, setOpen] = useState(false)
  const { auth } = useAuth()
  const role = getUserPrimaryRole(auth)
  const hasBusiness = hasBusinessActivity(auth) || hasServiceProviderActivity(auth)
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
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sidebar-border px-6 py-5">
          <Link href="/dashboard" className="flex items-center gap-2" onClick={close}>
            <MapPinned className="h-6 w-6 text-sidebar-primary" />
            <span className="text-lg font-bold tracking-tight">VEZI</span>
          </Link>
          <button className="text-sidebar-foreground lg:hidden" onClick={close} aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Zona + rol */}
        <div className="px-4 py-3">
          <div className="rounded-xl bg-sidebar-accent px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-sidebar-foreground/50">Zona activa</p>
            <p className="text-sm font-semibold">Hudson – Berazategui</p>
          </div>
          <div className="mt-2 rounded-xl bg-sidebar-accent/50 px-3 py-2">
            <p className="text-xs font-medium text-sidebar-foreground/70">{getRoleLabel(role)}</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {/* Explorar */}
          <p className="px-3 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-wide text-sidebar-foreground/40">Explorar</p>
          <ul className="flex flex-col gap-0.5">
            {exploreItems.map((item) => (
              <li key={item.label}>
                <SidebarLink item={item} onNavigate={close} />
              </li>
            ))}
          </ul>

          {/* Mi Negocio — solo si tiene actividad comercial */}
          {hasBusiness && (
            <>
              <p className="px-3 pb-1.5 pt-5 text-[10px] font-semibold uppercase tracking-wide text-sidebar-foreground/40">Mi negocio</p>
              <ul className="flex flex-col gap-0.5">
                {businessItems.map((item) => (
                  <li key={item.label}>
                    <SidebarLink item={item} onNavigate={close} />
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Mi cuenta */}
          <p className="px-3 pb-1.5 pt-5 text-[10px] font-semibold uppercase tracking-wide text-sidebar-foreground/40">Mi cuenta</p>
          <ul className="flex flex-col gap-0.5">
            {accountItems.map((item) => (
              <li key={item.href}>
                <SidebarLink item={item} onNavigate={close} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border px-3 py-4">
          <Link
            href="/dashboard/settings"
            onClick={close}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <Settings className="h-4 w-4" />
            Configuración
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" />
            Salir
          </Link>
        </div>
      </aside>
    </>
  )
}
