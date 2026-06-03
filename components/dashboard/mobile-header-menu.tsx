"use client"

import { useRouter } from "next/navigation"
import { BarChart3, Bookmark, Briefcase, CreditCard, HandHelping, HelpCircle, Home, Info, Menu, Settings, Sparkles, Store, User, Wrench, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { getVisibleNavItems, type CommercialModule, type VisibleNavItem } from "@/lib/commercial"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const iconByModule: Record<CommercialModule, LucideIcon> = {
  home: Home,
  necesito: HandHelping,
  servicios: Wrench,
  comercios: Store,
  emprendimientos: Sparkles,
  myBusiness: Briefcase,
  serviceManagement: BarChart3,
  professionalDashboard: BarChart3,
  saved: Bookmark,
  usefulInfo: Info,
  subscriptions: CreditCard,
  profile: User,
  settings: Settings,
}

const primaryModules = new Set<CommercialModule>(["home", "necesito", "servicios", "comercios", "emprendimientos"])
const communitySecondaryModules: CommercialModule[] = ["saved", "usefulInfo", "subscriptions", "profile", "settings"]
const contextualModules: CommercialModule[] = ["myBusiness", "serviceManagement", "professionalDashboard"]

function sortMenuItems(items: VisibleNavItem[]) {
  const order = [...communitySecondaryModules, ...contextualModules]

  return [...items].sort((a, b) => order.indexOf(a.module) - order.indexOf(b.module))
}

export function MobileHeaderMenu() {
  const router = useRouter()
  const { auth } = useAuth()
  const menuItems = sortMenuItems(
    getVisibleNavItems(auth).filter((item) => {
      if (primaryModules.has(item.module)) return false
      return communitySecondaryModules.includes(item.module) || contextualModules.includes(item.module)
    }),
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Más secciones"
        >
          <Menu className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2">
        <DropdownMenuLabel className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Más secciones
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((item) => {
          const Icon = iconByModule[item.module] ?? HelpCircle
          return (
            <DropdownMenuItem
              key={`${item.module}-${item.href}`}
              onClick={() => router.push(item.href)}
              className={cn("h-11 rounded-xl px-3 text-sm font-medium")}
            >
              <Icon className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1">{item.label}</span>
              {item.access === "preview" && <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">Preview</span>}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
