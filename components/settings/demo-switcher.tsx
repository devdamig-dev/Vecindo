"use client"

import { useAuth, type AccountType } from "@/lib/auth-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FlaskConical, User, Briefcase } from "lucide-react"

export function DemoSwitcher() {
  const { auth, setAccountType } = useAuth()

  const options: { type: AccountType; label: string; icon: typeof User }[] = [
    { type: "resident", label: "Residente", icon: User },
    { type: "external_professional", label: "Profesional Externo", icon: Briefcase },
  ]

  return (
    <div className="rounded-xl border-2 border-dashed border-warning/40 bg-warning/5 p-5">
      <div className="flex items-center gap-2 mb-3">
        <FlaskConical className="h-4 w-4 text-warning-foreground" />
        <h3 className="text-sm font-semibold text-foreground">Demo: Cambiar Tipo de Cuenta</h3>
        <Badge variant="outline" className="text-[10px] border-warning/40 text-warning-foreground">Solo desarrollo</Badge>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Cambia entre tipos de cuenta para ver como se adapta la interfaz. Esto reinicia las configuraciones al estado por defecto de cada rol.
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <Button
            key={opt.type}
            variant={auth.accountType === opt.type ? "default" : "outline"}
            size="sm"
            className="gap-2"
            onClick={() => setAccountType(opt.type)}
          >
            <opt.icon className="h-4 w-4" />
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
