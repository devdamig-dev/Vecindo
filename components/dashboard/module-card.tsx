import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type ModuleCardProps = {
  label: string
  description: string
  href: string
  icon: LucideIcon
  theme: "market" | "services" | "commercial" | "help"
  chip: string
}

const themeStyles = {
  market: {
    card: "border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/40",
    iconWrap: "bg-emerald-500 text-white shadow-emerald-400/35",
    accent: "bg-emerald-500/10 text-emerald-700",
  },
  services: {
    card: "border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-sky-100/40",
    iconWrap: "bg-sky-500 text-white shadow-sky-400/35",
    accent: "bg-sky-500/10 text-sky-700",
  },
  commercial: {
    card: "border-violet-200/70 bg-gradient-to-br from-violet-50 via-white to-violet-100/40",
    iconWrap: "bg-violet-500 text-white shadow-violet-400/35",
    accent: "bg-violet-500/10 text-violet-700",
  },
  help: {
    card: "border-orange-200/70 bg-gradient-to-br from-orange-50 via-white to-orange-100/40",
    iconWrap: "bg-orange-500 text-white shadow-orange-400/35",
    accent: "bg-orange-500/10 text-orange-700",
  },
} as const

export function ModuleCard({ label, description, href, icon: Icon, theme, chip }: ModuleCardProps) {
  const styles = themeStyles[theme]

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex min-h-[170px] flex-col overflow-hidden rounded-3xl border p-4 text-left shadow-[0_8px_28px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.1)]",
        styles.card
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/45 to-transparent" />
      <div className="flex items-start justify-between gap-3">
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg", styles.iconWrap)}>
          <Icon className="h-5 w-5" />
        </div>
        <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide", styles.accent)}>
          {chip}
        </span>
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-base font-semibold leading-tight text-foreground">{label}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>

      <div className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
        Explorar
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}
