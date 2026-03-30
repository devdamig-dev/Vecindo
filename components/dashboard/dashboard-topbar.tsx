"use client"

import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import { usePathname } from "next/navigation"

export function DashboardTopbar() {
  const { auth } = useAuth()
  const pathname = usePathname()
  const isCommerceDetail = /^\/dashboard\/comercios\/[^/]+/.test(pathname)

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/85">
      <div className="flex items-center gap-3 px-4 py-3 md:px-6">
        {!isCommerceDetail && (
          <div className="min-w-0 flex-1">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar servicios, personas, anuncios..." className="h-10 w-full rounded-xl pl-9 text-sm" />
            </div>
          </div>
        )}
        <div className={`ml-auto flex shrink-0 items-center gap-3 ${isCommerceDetail ? "w-full justify-end" : ""}`}>
          <button className="relative rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground" aria-label="Notificaciones">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">{auth.profile.avatarInitials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
