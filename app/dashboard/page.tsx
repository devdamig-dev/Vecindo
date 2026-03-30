import { ZoneOverview } from "@/components/dashboard/zone-overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ZoneUpdatesCarousel } from "@/components/zone-updates/zone-updates-carousel"
import { RecentAyudaWidget } from "@/components/ayuda/recent-ayuda-widget"
import { WeeklyActivity } from "@/components/dashboard/weekly-activity"

export default function DashboardPage() {
  return (
    <div className="flex min-w-0 flex-col gap-6 overflow-x-hidden">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Hudson – Berazategui</h1>
        <p className="text-sm text-muted-foreground">Ver qué pasa en mi zona</p>
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
