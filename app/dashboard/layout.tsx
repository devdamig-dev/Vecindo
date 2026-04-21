import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BottomNav } from "@/components/dashboard/bottom-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 via-white to-white">
      <DashboardHeader />
      <main className="mx-auto w-full max-w-2xl px-4 pb-28 pt-[7.75rem] sm:px-5">{children}</main>
      <BottomNav homeHref="/dashboard" />
    </div>
  )
}
