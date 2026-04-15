import { ZoneOverview } from "@/components/dashboard/zone-overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ZoneUpdatesCarousel } from "@/components/zone-updates/zone-updates-carousel"
import { RecentAyudaWidget } from "@/components/ayuda/recent-ayuda-widget"
import { WeeklyActivity } from "@/components/dashboard/weekly-activity"

export default function DashboardPage() {
  return (
    <div className="flex min-w-0 flex-col gap-7 overflow-x-hidden pb-2">
      <div className="space-y-2">
        <span className="inline-flex w-fit rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
          Inicio
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Hudson – Berazategui</h1>
        <p className="text-sm text-muted-foreground">Todo lo que pasa en tu comunidad, en un solo lugar.</p>
      </div>

      <ZoneUpdatesCarousel zoneId="berazategui" />
      <QuickActions />

      <div className="grid min-w-0 gap-6 lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
          <RecentActivity />
          <RecentAyudaWidget />
          <WeeklyActivity />
        </div>
        <div className="min-w-0">
          <ZoneOverview />
        </div>
      </div>
    </div>
  )
}
