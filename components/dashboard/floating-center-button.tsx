"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  href: string
}

export function FloatingCenterButton({ href }: Props) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "absolute left-1/2 top-0 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-[0_12px_24px_rgba(16,185,129,0.35)] transition-all duration-200 hover:scale-[1.03]",
        isActive && "ring-2 ring-primary/30"
      )}
      aria-label="Ir a inicio de VEZI"
    >
      <div className="flex flex-col items-center leading-none">
        <Home className="h-4 w-4" />
        <span className="mt-1 text-[10px] font-semibold">VEZI</span>
      </div>
    </Link>
  )
}
