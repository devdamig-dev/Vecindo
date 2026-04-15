"use client"

import { Bell } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import { SearchBar } from "@/components/dashboard/search-bar"
import { MobileHeaderMenu } from "@/components/dashboard/mobile-header-menu"

export function DashboardHeader() {
  const { auth } = useAuth()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background shadow-[0_6px_18px_rgba(15,23,42,0.06)]">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
          <Avatar className="h-10 w-10 border border-border/70">
            <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
              {auth.profile.avatarInitials}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Tu zona actual</p>
            <p className="truncate text-sm font-semibold text-foreground">{auth.profile.zone || "Hudson, Berazategui"}</p>
          </div>

          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              className="relative rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Notificaciones"
            >
              <Bell className="h-5 w-5" />
              <span
                aria-hidden="true"
                className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive"
              />
            </button>
            <MobileHeaderMenu />
          </div>
        </div>

        <SearchBar />
      </div>
    </header>
  )
}
