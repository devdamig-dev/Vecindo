import { RecentActivity } from "@/components/dashboard/recent-activity"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ZoneUpdatesCarousel } from "@/components/zone-updates/zone-updates-carousel"
import { RecentAyudaWidget } from "@/components/ayuda/recent-ayuda-widget"

export default function DashboardPage() {
  return (
    <div className="flex min-w-0 flex-col gap-6 overflow-x-hidden pb-4">
      <section className="space-y-2.5">
        <span className="inline-flex w-fit rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
          Inicio
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Hudson – Berazategui</h1>
        <p className="max-w-md text-sm text-muted-foreground">Todo lo que pasa en tu comunidad, en un solo lugar.</p>
      </section>

      <ZoneUpdatesCarousel zoneId="berazategui" />
      <QuickActions />

      <section className="flex min-w-0 flex-col gap-6">
        <RecentActivity />
        <RecentAyudaWidget />
      </section>
    </div>
  )
}
