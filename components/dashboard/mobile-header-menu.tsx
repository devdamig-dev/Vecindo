"use client"

import { useRouter } from "next/navigation"
import {
  Bookmark,
  CreditCard,
  HelpCircle,
  Info,
  Menu,
  Settings,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const menuItems = [
  { label: "Preguntas", href: "/dashboard/questions", icon: HelpCircle },
  { label: "Guardados", href: "/dashboard/guardados", icon: Bookmark },
  { label: "Suscripciones", href: "/dashboard/suscripciones", icon: CreditCard },
  { label: "Información útil", href: "/dashboard/informacion-util", icon: Info },
  { label: "Configuración", href: "/dashboard/settings", icon: Settings },
  { label: "Mi perfil", href: "/dashboard/profile", icon: User },
]

export function MobileHeaderMenu() {
  const router = useRouter()

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
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.href}
            onClick={() => router.push(item.href)}
            className={cn("h-11 rounded-xl px-3 text-sm font-medium")}
          >
            <item.icon className="h-4 w-4 text-muted-foreground" />
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
