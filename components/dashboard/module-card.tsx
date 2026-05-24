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
    card: "border-cyan-300/30 bg-[linear-gradient(160deg,rgba(8,23,45,0.96),rgba(10,55,68,0.84))]",
    iconWrap: "bg-gradient-to-br from-cyan-400 to-emerald-400 text-slate-950 shadow-cyan-400/30",
    accent: "bg-cyan-300/20 text-cyan-100",
  },
  services: {
    card: "border-sky-300/30 bg-[linear-gradient(160deg,rgba(8,29,56,0.96),rgba(30,58,138,0.82))]",
    iconWrap: "bg-gradient-to-br from-sky-400 to-indigo-400 text-slate-950 shadow-sky-400/35",
    accent: "bg-sky-300/20 text-sky-100",
  },
  commercial: {
    card: "border-violet-300/30 bg-[linear-gradient(160deg,rgba(25,14,60,0.96),rgba(76,29,149,0.82))]",
    iconWrap: "bg-gradient-to-br from-violet-400 to-fuchsia-400 text-slate-950 shadow-violet-500/35",
    accent: "bg-violet-300/20 text-violet-100",
  },
  help: {
    card: "border-fuchsia-300/25 bg-[linear-gradient(160deg,rgba(28,15,55,0.95),rgba(67,20,95,0.82))]",
    iconWrap: "bg-gradient-to-br from-fuchsia-400 to-purple-400 text-slate-950 shadow-fuchsia-500/35",
    accent: "bg-fuchsia-300/20 text-fuchsia-100",
  },
} as const

export function ModuleCard({ label, description, href, icon: Icon, theme, chip }: ModuleCardProps) {
  const styles = themeStyles[theme]

  return (
    <Link href={href} className={cn("group press-card premium-glow relative flex min-h-[172px] flex-col overflow-hidden rounded-3xl border px-4 pb-4 pt-5 text-left", styles.card)}>
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
      <div className="flex items-start justify-between gap-2.5">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shadow-lg", styles.iconWrap)}><Icon className="h-5 w-5" /></div>
        <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none tracking-wide", styles.accent)}>{chip}</span>
      </div>
      <div className="mt-4 space-y-2">
        <p className="text-[15px] font-semibold leading-tight text-white">{label}</p>
        <p className="text-[13px] leading-relaxed text-slate-200/85">{description}</p>
      </div>
      <div className="mt-auto flex items-center gap-1 pt-3 text-[13px] font-semibold text-white/90 transition-colors group-hover:text-white">
        Explorar
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}
