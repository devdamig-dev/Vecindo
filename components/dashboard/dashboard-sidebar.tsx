"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import {
  Shield,
  LayoutDashboard,
  Search,
  ShoppingBag,
  MessageCircle,
  User,
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
  Building2,
} from "lucide-react"
import { useState } from "react"

interface NavItem {
  label: string
  href: string
  icon: typeof LayoutDashboard
  requireCapability?: string
  residentOnly?: boolean
}

const allNavItems: NavItem[] = [
  { label: "Inicio", href: "/dashboard", icon: LayoutDashboard, residentOnly: true },
  { label: "Servicios", href: "/dashboard/services", icon: Search },
  { label: "Preguntas", href: "/dashboard/questions", icon: MessageCircle, requireCapability: "canPublishQuestions" },
  { label: "Mercado", href: "/dashboard/marketplace", icon: ShoppingBag, requireCapability: "canAccessMarketplace" },
  { label: "Ayuda Comunitaria", href: "/dashboard/ayuda", icon: Heart },
  { label: "Comercios", href: "/dashboard/comercios", icon: Store, residentOnly: true },
  { label: "Información útil", href: "/dashboard/informacion-util", icon: Info },
  { label: "Mi barrio", href: "/dashboard/mi-barrio", icon: Building2, residentOnly: true },
  { label: "Suscripciones", href: "/dashboard/suscripciones", icon: CreditCard },
  { label: "Guardados", href: "/dashboard/guardados", icon: Bookmark, residentOnly: true },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { auth } = useAuth()
  const isResident = auth.accountType === "resident"
  const { capabilities } = auth

  const navItems = allNavItems.filter((item) => {
    if (item.residentOnly && !isResident) return false
    if (item.requireCapability) {
      const cap = item.requireCapability as keyof typeof capabilities
      if (!capabilities[cap]) return false
    }
    return true
  })

  return (
    <>
      <button
        className="fixed left-4 top-4 z-50 rounded-lg bg-sidebar p-2 text-sidebar-foreground lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Abrir navegación"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-sidebar-border px-6 py-5">
          <Link href={isResident ? "/dashboard" : "/dashboard/services"} className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-sidebar-primary" />
            <span className="text-lg font-bold tracking-tight">VECINDO</span>
          </Link>
          <button
            className="lg:hidden text-sidebar-foreground"
            onClick={() => setOpen(false)}
            aria-label="Cerrar navegación"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 py-3">
          <div className="rounded-lg bg-sidebar-accent px-3 py-2">
            <p className="text-xs text-sidebar-foreground/60">Zona</p>
            <p className="text-sm font-semibold">Hudson – Berazategui</p>
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-sidebar-accent/50 px-3 py-2">
            {isResident ? (
              <>
                <ShieldCheck className="h-3.5 w-3.5 text-sidebar-primary" />
                <span className="text-xs font-medium text-sidebar-foreground/80">Residente</span>
              </>
            ) : (
              <>
                <Briefcase className="h-3.5 w-3.5 text-sidebar-primary" />
                <span className="text-xs font-medium text-sidebar-foreground/80">Prestador de servicios</span>
              </>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border px-3 py-4">
          <Link
            href="/dashboard/profile"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              pathname === "/dashboard/profile"
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            <User className="h-4 w-4" />
            Mi Perfil
          </Link>
          <Link
            href="/dashboard/settings"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              pathname === "/dashboard/settings"
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            <Settings className="h-4 w-4" />
            Configuración
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Link>
        </div>
      </aside>
    </>
  )
}