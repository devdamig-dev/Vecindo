import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar"
import { AuthProvider } from "@/lib/auth-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-background overflow-x-hidden">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col lg:pl-64 min-w-0 overflow-x-hidden">
          <DashboardTopbar />
          <main className="flex-1 p-4 md:p-6 max-w-full overflow-x-hidden">{children}</main>
        </div>
      </div>
    </AuthProvider>
  )
}
