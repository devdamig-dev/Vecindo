import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ActivityInsight, ActivityTone } from "@/lib/activity-insights"

const toneClasses: Record<ActivityTone, string> = {
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  sky: "border-[#cddbd6] bg-[#eef4f1] text-[#476d66]",
  violet: "border-[#d8d2e7] bg-[#f2eff8] text-[#6f628f]",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  slate: "border-border bg-muted/40 text-muted-foreground",
}

type ActivityChipsProps = {
  insights: ActivityInsight[]
  limit?: number
  className?: string
  chipClassName?: string
}

export function ActivityChips({ insights, limit, className, chipClassName }: ActivityChipsProps) {
  const visibleInsights = typeof limit === "number" ? insights.slice(0, limit) : insights

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
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
