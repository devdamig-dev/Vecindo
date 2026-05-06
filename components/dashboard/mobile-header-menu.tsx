"use client"

import { useRouter } from "next/navigation"
import { BarChart3, Bookmark, Briefcase, CreditCard, HeartHandshake, HelpCircle, Home, Info, Menu, MessageCircle, Settings, Store, User, Wrench, ShoppingBag, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { getVisibleNavItems, type CommercialModule } from "@/lib/commercial"
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

export function MobileHeaderMenu() {
  const router = useRouter()
  const { auth } = useAuth()
  const menuItems = getVisibleNavItems(auth).filter((item) => item.priority === "secondary" || item.module === "questions" || item.module === "usefulInfo")

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
