import { ZoneOverview } from "@/components/dashboard/zone-overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ZoneUpdatesCarousel } from "@/components/zone-updates/zone-updates-carousel"
import { RecentAyudaWidget } from "@/components/ayuda/recent-ayuda-widget"
import { WeeklyActivity } from "@/components/dashboard/weekly-activity"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Hudson – Berazategui</h1>
        <p className="text-sm text-muted-foreground">Panel de tu comunidad</p>
      </div>

      <ZoneUpdatesCarousel zoneId="berazategui" />

      <QuickActions />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <RecentActivity />
          <RecentAyudaWidget />
          <WeeklyActivity />
        </div>

        <ZoneOverview />
      </div>
    </div>
  )
}