"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff, Home, Briefcase, ArrowLeft } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

type Step = "choose" | "resident_register" | "external_register" | "login"

const neighborhoods = [
  { name: "Los Ombu\u00e9s", zone: "Hudson \u2013 Berazategui" },
  { name: "Las Golondrinas", zone: "Hudson \u2013 Berazategui" },
  { name: "San Eliseo", zone: "Hudson \u2013 Berazategui" },
  { name: "El Canton", zone: "Hudson \u2013 Berazategui" },
  { name: "La Providencia", zone: "Hudson \u2013 Berazategui" },
  { name: "Lagos de Hudson", zone: "Hudson \u2013 Berazategui" },
]

const serviceCategories = [
  "Electricidad", "Plomer\u00eda", "Pintura", "Jardiner\u00eda", "Limpieza",
  "Clases", "Cerrajer\u00eda", "Alba\u00f1iler\u00eda", "Veterinaria", "Otro",
]

export function LoginForm() {
  const router = useRouter()
  const { setAccountType } = useAuth()
  const [step, setStep] = useState<Step>("choose")
  const [showPassword, setShowPassword] = useState(false)
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("")

  const detectedZone = neighborhoods.find((n) => n.name === selectedNeighborhood)?.zone || ""

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Demo routing: Residente entra al panel general; Prestador entra directo a Servicios.
    if (step === "external_register") {
      setAccountType("external_professional")
      router.push("/dashboard/services")
      return
    }
    setAccountType("resident")
    router.push("/dashboard")
  }

  if (step === "choose") {
    return (
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight text-foreground">VECINDO</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground text-balance">{"\u00bfC\u00f3mo quer\u00e9s ingresar?"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {"Eleg\u00ed tu tipo de cuenta para comenzar"}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => setStep("resident_register")}
            className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-primary/40 hover:shadow-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Home className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Soy Propietario / Residente</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Vivo en un barrio de la zona
              </p>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Acceso a Servicios, Mercado y Ayuda
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Publicar en Novedades de la Zona
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Crear emprendimiento o comercio
                </li>
              </ul>
            </div>
          </button>

          <button
            onClick={() => setStep("external_register")}
            className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-primary/40 hover:shadow-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-chart-2/10 text-chart-2 transition-colors group-hover:bg-chart-2 group-hover:text-primary-foreground">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Soy Prestador de Servicios</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Trabajo en la zona y quiero ofrecer mis servicios
              </p>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-chart-2" />
                  {"Perfil p\u00fablico"}
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-chart-2" />
                  {"Recibir rese\u00f1as de vecinos"}
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-chart-2" />
                  {"Aparecer en b\u00fasquedas de Servicios"}
                </li>
              </ul>
            </div>
          </button>
        </div>

        <div className="mt-6 space-y-3 text-center">
          <p className="text-sm text-muted-foreground">
            {"Ya ten\u00e9s una cuenta? "}
            <button
              onClick={() => setStep("login")}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {"Iniciar sesi\u00f3n"}
            </button>
          </p>
          <p className="text-xs text-muted-foreground">
            {"¿Ten\u00e9s un comercio en la zona? "}
            <a
              href="/dashboard/suscripciones?plan=comercio"
              className="font-medium text-primary/80 underline-offset-4 hover:underline hover:text-primary"
            >
              {"Sumate a la gu\u00eda"}
            </a>
          </p>
        </div>
      </div>
    )
  }

  if (step === "login") {
    return (
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight text-foreground">VECINDO</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Bienvenido de nuevo</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {"Inici\u00e1 sesi\u00f3n para acceder a tu comunidad"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Correo Electr\u00f3nico</Label>
            <Input id="email" type="email" placeholder="tu@email.com" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Contrase\u00f1a</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Ingres\u00e1 tu contrase\u00f1a"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contrase\u00f1a" : "Mostrar contrase\u00f1a"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" className="mt-2 w-full">Iniciar Sesi\u00f3n</Button>
        </form>

        <button
          onClick={() => setStep("choose")}
          className="mt-4 flex items-center justify-center gap-2 w-full text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>
      </div>
    )
  }

  const isResident = step === "resident_register"

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold tracking-tight text-foreground">VECINDO</span>
        </Link>
        <h1 className="text-2xl font-bold text-foreground">
          {isResident ? "Registro de Residente" : "Registro de Prestador"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isResident
            ? "Verific\u00e1 tu direcci\u00f3n para unirte a tu zona"
            : "Registrate para ofrecer tus servicios"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="reg-name">Nombre Completo</Label>
          <Input id="reg-name" placeholder="Nombre y Apellido" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="reg-email">Correo Electr\u00f3nico</Label>
          <Input id="reg-email" type="email" placeholder="tu@email.com" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="reg-whatsapp">WhatsApp</Label>
          <Input id="reg-whatsapp" placeholder="+54 11 1234-5678" />
        </div>

        {isResident ? (
          <>
            <div className="flex flex-col gap-2">
              <Label htmlFor="reg-neighborhood">Barrio</Label>
              <select
                id="reg-neighborhood"
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Seleccionar barrio...</option>
                {neighborhoods.map((n) => (
                  <option key={n.name} value={n.name}>{n.name}</option>
                ))}
              </select>
            </div>
            {detectedZone && (
              <div className="rounded-lg bg-primary/5 border border-primary/20 px-3 py-2">
                <p className="text-xs text-muted-foreground">Zona detectada</p>
                <p className="text-sm font-semibold text-primary">{detectedZone}</p>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <Label htmlFor="reg-category">Categor\u00eda Principal</Label>
              <select
                id="reg-category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Seleccionar categor\u00eda...</option>
                {serviceCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="reg-zone">Zona donde trabaj\u00e1s</Label>
              <select
                id="reg-zone"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Seleccionar zona...</option>
                <option value="hudson-berazategui">Hudson \u2013 Berazategui</option>
              </select>
            </div>
          </>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="reg-password">Contrase\u00f1a</Label>
          <div className="relative">
            <Input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              placeholder="Cre\u00e1 una contrase\u00f1a"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar contrase\u00f1a" : "Mostrar contrase\u00f1a"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <Button type="submit" className="mt-2 w-full">
          {isResident ? "Solicitar Acceso" : "Registrarme"}
        </Button>
      </form>

      <button
        onClick={() => setStep("choose")}
        className="mt-4 flex items-center justify-center gap-2 w-full text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </button>
    </div>
  )
}
