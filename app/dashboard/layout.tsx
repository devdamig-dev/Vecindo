import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BottomNav } from "@/components/dashboard/bottom-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fbfaf6_0%,#f4f1ea_100%)]">
      <DashboardHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pb-28 pt-[7.75rem] sm:px-6 lg:px-8">{children}</main>
      <BottomNav homeHref="/dashboard" />
    </div>
  )
}
