import { LoginForm } from "@/components/auth/login-form"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,90,103,0.10),transparent_38%),radial-gradient(circle_at_80%_10%,rgba(216,27,255,0.08),transparent_38%)]" />
      <div className="relative z-10 w-full"><Suspense fallback={<div className="text-center text-sm text-muted-foreground">Cargando acceso…</div>}><LoginForm /></Suspense></div>
    </div>
  )
}
