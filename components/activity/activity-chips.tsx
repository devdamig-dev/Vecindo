import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ActivityInsight, ActivityTone } from "@/lib/activity-insights"

const toneClasses: Record<ActivityTone, string> = {
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  sky: "border-sky-200 bg-sky-50 text-sky-700",
  violet: "border-violet-200 bg-violet-50 text-violet-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  rose: "border-rose-200 bg-rose-50 text-rose-700",
  slate: "border-border bg-muted/40 text-muted-foreground",
}

type ActivityChipsProps = {
  insights: ActivityInsight[]
  limit?: number
  className?: string
  chipClassName?: string
  /** Las señales se reemplazarán por agregados de eventos del backend. */
  demo?: boolean
}

export function ActivityChips({ insights, limit, className, chipClassName, demo = true }: ActivityChipsProps) {
  const visibleInsights = typeof limit === "number" ? insights.slice(0, limit) : insights

  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)} aria-label={demo ? "Señales de actividad de demostración" : "Señales de actividad"}>
      {demo && <span className="text-[9px] font-bold uppercase tracking-wide text-muted-foreground" title="Datos de demostración">Demo</span>}
      {visibleInsights.map((insight) => (
        <Badge
          key={insight.label}
          variant="outline"
          className={cn(
            "h-6 rounded-full px-2 py-0 text-[10px] font-medium leading-none shadow-none hover:bg-inherit",
            toneClasses[insight.tone ?? "slate"],
            chipClassName,
          )}
        >
          {insight.label}
        </Badge>
      ))}
    </div>
  )
}
