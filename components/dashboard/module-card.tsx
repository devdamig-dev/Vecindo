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
    card: "border-emerald-200/80 bg-gradient-to-br from-emerald-100 via-white to-emerald-200/55",
    iconWrap: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/40",
    accent: "bg-emerald-500/10 text-emerald-700",
  },
  services: {
    card: "border-sky-200/80 bg-gradient-to-br from-sky-100 via-white to-blue-200/55",
    iconWrap: "bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sky-500/40",
    accent: "bg-sky-500/10 text-sky-700",
  },
  commercial: {
    card: "border-violet-200/80 bg-gradient-to-br from-violet-100 via-fuchsia-50 to-violet-200/55",
    iconWrap: "bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-violet-500/40",
    accent: "bg-violet-500/10 text-violet-700",
  },
  help: {
    card: "border-rose-200/80 bg-gradient-to-br from-rose-100 via-white to-orange-100/60",
    iconWrap: "bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-rose-500/40",
    accent: "bg-rose-500/10 text-rose-700",
  },
} as const

export function ModuleCard({ label, description, href, icon: Icon, theme, chip }: ModuleCardProps) {
  const styles = themeStyles[theme]

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex min-h-[164px] flex-col overflow-hidden rounded-3xl border px-4 pb-4 pt-5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.16)] hover:ring-1 hover:ring-white/90 active:scale-[0.99]",
        styles.card
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/45 to-transparent" />
      <div className="flex items-start justify-between gap-2.5">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shadow-lg", styles.iconWrap)}>
          <Icon className="h-5 w-5" />
        </div>
        <span className={cn("rounded-full px-2.5 py-1 text-[12px] font-semibold leading-none tracking-wide", styles.accent)}>
          {chip}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-[15px] font-semibold leading-tight text-foreground">{label}</p>
        <p className="text-[13px] leading-relaxed text-muted-foreground">{description}</p>
      </div>

      <div className="mt-auto flex items-center gap-1 pt-3 text-[13px] font-semibold text-foreground/80 transition-colors group-hover:text-foreground">
        Explorar
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}
