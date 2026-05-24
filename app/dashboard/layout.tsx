import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BottomNav } from "@/components/dashboard/bottom-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9fbff] via-[#f6f8fc] to-[#f4f7fb]">
      <DashboardHeader />
      <main className="mx-auto w-full max-w-2xl px-4 pb-28 pt-[7.75rem] sm:px-5 lg:max-w-3xl">{children}</main>
      <BottomNav homeHref="/dashboard" />
    </div>
  )
}
