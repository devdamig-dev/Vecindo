"use client"

import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"

export function DashboardTopbar() {
  const { auth } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card px-4 py-3 md:px-6">
      <div className="ml-10 flex-1 lg:ml-0">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar servicios, personas, anuncios..."
            className="h-9 pl-9 text-sm"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative text-muted-foreground hover:text-foreground" aria-label="Notificaciones">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-destructive" />
        </button>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {auth.profile.avatarInitials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
