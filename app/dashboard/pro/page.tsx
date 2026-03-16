import { Eye, Phone, MessageCircle, Star } from "lucide-react"

export default function ProDashboardPage() {
  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Panel profesional
        </h1>
        <p className="text-sm text-muted-foreground">
          Gestioná tu presencia en la comunidad
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="h-4 w-4"/>
            <span className="text-sm">Visitas al perfil</span>
          </div>
          <p className="mt-2 text-2xl font-bold">56</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MessageCircle className="h-4 w-4"/>
            <span className="text-sm">Clics en WhatsApp</span>
          </div>
          <p className="mt-2 text-2xl font-bold">8</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4"/>
            <span className="text-sm">Llamadas</span>
          </div>
          <p className="mt-2 text-2xl font-bold">5</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Star className="h-4 w-4"/>
            <span className="text-sm">Puntuación</span>
          </div>
          <p className="mt-2 text-2xl font-bold">4.8</p>
        </div>

      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">
          Accesos rápidos
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          <a
            href="/dashboard/profile"
            className="rounded-lg border border-border p-4 hover:bg-muted transition"
          >
            Editar perfil
          </a>

          <a
            href="/dashboard/services"
            className="rounded-lg border border-border p-4 hover:bg-muted transition"
          >
            Ver directorio
          </a>

          <a
            href="/dashboard/suscripciones"
            className="rounded-lg border border-border p-4 hover:bg-muted transition"
          >
            Gestionar suscripción
          </a>

          <a
            href="/dashboard/settings"
            className="rounded-lg border border-border p-4 hover:bg-muted transition"
          >
            Configuración
          </a>

        </div>
      </div>

    </div>
  )
}