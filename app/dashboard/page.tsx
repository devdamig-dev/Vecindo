import Link from "next/link"
import { ZoneOverview } from "@/components/dashboard/zone-overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ZoneUpdatesCarousel } from "@/components/zone-updates/zone-updates-carousel"
import { RecentAyudaWidget } from "@/components/ayuda/recent-ayuda-widget"
import { WeeklyActivity } from "@/components/dashboard/weekly-activity"
import { Button } from "@/components/ui/button"
import { Eye, Package, Wrench } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hudson – Berazategui</h1>
          <p className="text-sm text-muted-foreground">Lo que pasa en tu zona, ordenado en un solo lugar.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline"><Link href="/dashboard/marketplace"><Package className="mr-2 h-4 w-4" />Publicar producto</Link></Button>
          <Button asChild variant="outline"><Link href="/dashboard/services"><Wrench className="mr-2 h-4 w-4" />Ofrecer servicio</Link></Button>
          <Button asChild><Link href="/dashboard/questions"><Eye className="mr-2 h-4 w-4" />Ver qué pasa en mi zona</Link></Button>
        </div>
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
