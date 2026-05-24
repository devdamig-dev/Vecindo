import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BottomNav } from "@/components/dashboard/bottom-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.14),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.18),transparent_42%),linear-gradient(180deg,#090f27_0%,#0b1028_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-80" />
      <DashboardHeader />
      <main className="relative mx-auto w-full max-w-2xl px-4 pb-28 pt-[7.75rem] sm:px-5 lg:max-w-3xl">{children}</main>
      <BottomNav homeHref="/dashboard" />
    </div>
  )
}
