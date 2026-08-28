"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, Shield, Sparkles } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

type Step = "welcome" | "register" | "login" | "onboarding"

const interestAreas = ["Servicios", "Comercios", "Historias locales", "Promociones", "Recomendaciones"]

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAccountType, setCapability, updateCommercialActivity } = useAuth()
  const initialMode = searchParams.get("mode")
  const [step, setStep] = useState<Step>(initialMode === "register" || initialMode === "login" ? initialMode : "welcome")
  const [showPassword, setShowPassword] = useState(false)
  const requestedIntent = searchParams.get("intent")
  const [participation, setParticipation] = useState<string[]>(requestedIntent ? [requestedIntent] : ["neighbor"])

  function enterApp(e: React.FormEvent) {
    e.preventDefault()
    setAccountType("resident")
    window.localStorage.setItem("vezi_session", "active")
    router.push("/dashboard")
  }

  function finishRegistration(e: React.FormEvent) {
    e.preventDefault()
    setAccountType("resident")
    setCapability("canOfferServices", participation.includes("service"))
    setCapability("canSell", participation.includes("commerce") || participation.includes("venture"))
    updateCommercialActivity({ hasBusinessProfile: participation.includes("commerce"), hasEntrepreneurProfile: participation.includes("venture") })
    window.localStorage.setItem("vezi_session", "active")
    router.push("/dashboard")
  }

  if (step === "onboarding") {
    const options = [["neighbor", "Vecino/a", "Buscar, descubrir, pedir y publicar necesidades."], ["service", "Prestador de servicios", "Mostrar tu especialidad y recibir consultas."], ["commerce", "Comercio", "Crear un perfil de negocio con catálogo y pedidos."], ["venture", "Emprendimiento", "Mostrar producción propia y recibir encargos."]]
    return <div className="mx-auto w-full max-w-lg rounded-3xl border border-border/80 bg-white/90 p-6 shadow-xl backdrop-blur-xl"><p className="text-xs font-bold uppercase tracking-widest text-primary">Configuración · paso 2 de 2</p><h1 className="mt-3 text-2xl font-bold">¿Cómo querés participar?</h1><p className="mt-2 text-sm text-muted-foreground">Elegí todas las opciones que quieras. Podés cambiarlas más adelante.</p><form onSubmit={finishRegistration} className="mt-6"><div className="grid gap-3 sm:grid-cols-2">{options.map(([value,title,copy])=>{const active=participation.includes(value);return <button type="button" key={value} aria-pressed={active} onClick={()=>setParticipation(prev=>active?prev.filter(x=>x!==value):[...prev,value])} className={`rounded-2xl border p-4 text-left transition ${active ? "border-primary bg-primary/10 ring-2 ring-primary/20" : "bg-white hover:border-primary/40"}`}><b>{title}</b><p className="mt-1 text-xs text-muted-foreground">{copy}</p></button>})}</div><Button type="submit" disabled={!participation.length} className="mt-6 w-full">Completar registro y entrar</Button></form><button onClick={()=>setStep("register")} className="mt-4 flex w-full items-center justify-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4"/>Volver a mis datos</button></div>
  }

  if (step === "welcome") {
    return (
      <div className="mx-auto w-full max-w-md rounded-3xl border border-primary/20 bg-white/80 p-6 shadow-[0_24px_60px_rgba(14,116,144,0.15)] backdrop-blur-xl">
        <div className="mb-7 text-center">
          <Link href="/" className="mb-5 inline-flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight text-foreground">VEZI</span>
          </Link>
          <h1 className="text-balance text-2xl font-bold text-foreground">Entrá a tu red local</h1>
          <p className="mt-2 text-sm text-muted-foreground">Descubrí servicios, negocios y movimiento real cerca tuyo.</p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2">
          {interestAreas.map((area) => (
            <span key={area} className="rounded-full bg-primary/10 px-3 py-1.5 text-center text-xs font-semibold text-primary">{area}</span>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Button className="w-full" onClick={() => setStep("register")}>Crear cuenta</Button>
          <Button variant="outline" className="w-full" onClick={() => setStep("login")}>Entrar a VEZI</Button>
        </div>
      </div>
    )
  }

  if (step === "login") {
    return (
      <div className="w-full max-w-sm rounded-3xl border border-border/80 bg-white/85 p-6 shadow-xl backdrop-blur-xl">
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-foreground">Entrar a VEZI</h1>
          <p className="mt-2 text-sm text-muted-foreground">Conectá con actividad local en segundos.</p>
        </div>

        <form onSubmit={enterApp} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2"><Label htmlFor="email">Correo electrónico</Label><Input id="email" type="email" placeholder="tu@email.com" /></div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} placeholder="Ingresá tu contraseña" />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" className="mt-2 w-full">Empezar ahora</Button>
        </form>

        <button onClick={() => setStep("welcome")} className="mt-4 flex w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />Volver</button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm rounded-3xl border border-border/80 bg-white/85 p-6 shadow-xl backdrop-blur-xl">
      <div className="mb-7 text-center">
        <h1 className="text-2xl font-bold text-foreground">Crear cuenta</h1>
        <p className="mt-2 text-sm text-muted-foreground">Un perfil flexible para descubrir, publicar y vender en tu zona.</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); setStep("onboarding") }} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2"><Label htmlFor="name">Nombre completo</Label><Input id="name" placeholder="Nombre y apellido" /></div>
        <div className="flex flex-col gap-2"><Label htmlFor="reg-email">Correo electrónico</Label><Input id="reg-email" type="email" placeholder="tu@email.com" /></div>
        <div className="flex flex-col gap-2"><Label htmlFor="zone">Tu zona principal</Label><Input id="zone" placeholder="Ej. Hudson, Berazategui" /></div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="reg-password">Contraseña</Label>
          <div className="relative">
            <Input id="reg-password" type={showPassword ? "text" : "password"} placeholder="Creá una contraseña" />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </div>
        </div>
        <div className="rounded-xl bg-primary/10 p-3 text-xs text-primary"><Sparkles className="mr-1 inline h-3.5 w-3.5" />En el próximo paso vas a poder elegir uno o varios perfiles sin limitar tu cuenta.</div>
        <Button type="submit" className="mt-2 w-full">Continuar a configurar mi perfil</Button>
      </form>
      <button onClick={() => setStep("welcome")} className="mt-4 flex w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />Volver</button>
    </div>
  )
}
