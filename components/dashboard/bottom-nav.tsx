"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BriefcaseBusiness, Heart, Search, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { FloatingCenterButton } from "@/components/dashboard/floating-center-button"

type Props = {
  homeHref: string
}

const navItems = [
  { label: "Mercado", href: "/dashboard/marketplace", icon: ShoppingBag },
  { label: "Servicios", href: "/dashboard/services", icon: Search },
  { label: "Comercial", href: "/dashboard/espacio-comercial", icon: BriefcaseBusiness },
  { label: "Ayuda", href: "/dashboard/ayuda", icon: Heart },
]

export function BottomNav({ homeHref }: Props) {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-card/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_rgba(2,6,23,0.08)] backdrop-blur">
      <div className="relative mx-auto grid max-w-2xl grid-cols-5 items-end px-3">
        <div className="col-span-2 grid grid-cols-2">
          {navItems.slice(0, 2).map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium text-muted-foreground transition-all duration-200",
                  isActive && "bg-primary/10 text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="relative h-10" aria-hidden />
        <FloatingCenterButton href={homeHref} />

        <div className="col-span-2 grid grid-cols-2">
          {navItems.slice(2).map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium text-muted-foreground transition-all duration-200",
                  isActive && "bg-primary/10 text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
