"use client"

import { useMemo, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { ServicesSearch } from "@/components/services/services-search"
import { ServicesList, professionals } from "@/components/services/services-list"
import { SectionIntroBanner } from "@/components/ui/section-intro-banner"
import { NeighborRecommendations } from "@/components/services/neighbor-recommendations"
import { Eye, MessageSquare, Phone, Star, PencilLine, CreditCard, UserRound } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const { auth } = useAuth()
  const isProfessional = auth.accountType === "external_professional"

  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Todos")

  const filteredProfessionals = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return professionals.filter((pro) => {
      const matchesCategory =
        activeCategory === "Todos" || pro.category === activeCategory

      const matchesQuery =
        normalizedQuery.length === 0 ||
        pro.name.toLowerCase().includes(normalizedQuery) ||
        pro.title.toLowerCase().includes(normalizedQuery) ||
        pro.description.toLowerCase().includes(normalizedQuery) ||
        pro.category.toLowerCase().includes(normalizedQuery) ||
        pro.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))

      return matchesCategory && matchesQuery
    })
  }, [query, activeCategory])

  if (isProfessional) {
    return (
      <div className="flex max-w-full flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tu presencia en servicios</h1>
          <p className="text-sm text-muted-foreground">
            Gestioná tu perfil profesional y seguí tu actividad dentro de la zona
          </p>
        </div>

        <SectionIntroBanner
          sectionId="services-professional"
          title="Tu perfil profesional en la comunidad"
          description="Desde acá podés ver cómo te encuentran los vecinos y mejorar tu visibilidad."
          howItWorks={{
            title: "¿Cómo funciona tu perfil?",
            steps: [
              "Completá tu perfil profesional para aparecer mejor posicionado.",
              "Recibí consultas y contactos desde vecinos de la zona.",
              "Acumulá reseñas para generar más confianza.",
              "Mejorá tu plan para obtener más visibilidad.",
            ],
          }}
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span className="text-sm">Visitas al perfil</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">56</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm">Clics en WhatsApp</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">8</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span className="text-sm">Llamadas</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">5</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-4 w-4" />
              <span className="text-sm">Puntuación</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">4.8</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Accesos rápidos</h2>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Link
              href="/dashboard/profile"
              className="rounded-lg border border-border p-4 transition hover:bg-muted"
            >
              <div className="mb-2 flex items-center gap-2 text-foreground">
                <UserRound className="h-4 w-4 text-primary" />
                <span className="font-medium">Ver mi perfil</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Revisá cómo te ve la comunidad
              </p>
            </Link>

            <Link
              href="/dashboard/settings"
              className="rounded-lg border border-border p-4 transition hover:bg-muted"
            >
              <div className="mb-2 flex items-center gap-2 text-foreground">
                <PencilLine className="h-4 w-4 text-primary" />
                <span className="font-medium">Editar perfil</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Actualizá tu descripción, rubro y experiencia
              </p>
            </Link>

            <Link
              href="/dashboard/suscripciones"
              className="rounded-lg border border-border p-4 transition hover:bg-muted"
            >
              <div className="mb-2 flex items-center gap-2 text-foreground">
                <CreditCard className="h-4 w-4 text-primary" />
                <span className="font-medium">Gestionar suscripción</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Mejorá tu visibilidad dentro de la zona
              </p>
            </Link>

            <Link
              href="/dashboard/services"
              className="rounded-lg border border-border p-4 transition hover:bg-muted"
            >
              <div className="mb-2 flex items-center gap-2 text-foreground">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span className="font-medium">Explorar directorio</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Mirá cómo se muestran otros perfiles de servicios
              </p>
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-2 text-lg font-semibold text-foreground">Consejos para mejorar tu perfil</h2>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-muted-foreground">
            <li>Completá tu descripción con más detalle y especialidades.</li>
            <li>Sumá fotos o trabajos realizados para generar más confianza.</li>
            <li>Pedí reseñas a vecinos que ya hayan trabajado con vos.</li>
            <li>Considerá un plan destacado para aparecer más arriba en búsquedas.</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="flex max-w-full flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Directorio de servicios</h1>
        <p className="text-sm text-muted-foreground">
          Encontrá profesionales verificados en tu zona
        </p>
      </div>

      <SectionIntroBanner
        sectionId="services"
        title="Profesionales verificados de tu zona"
        description="Todos los prestadores tienen reseñas reales de vecinos."
        howItWorks={{
          title: "¿Cómo funciona Servicios?",
          steps: [
            "Buscá por categoría o escribiendo el servicio que necesitás.",
            "Mirá las reseñas y puntuaciones de otros vecinos.",
            "Contactá directamente por WhatsApp sin intermediarios.",
            "Después del trabajo, dejá tu reseña para ayudar a otros.",
          ],
        }}
      />

      <NeighborRecommendations />

      <ServicesSearch
        query={query}
        onQueryChange={setQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="text-sm text-muted-foreground">
        {filteredProfessionals.length} resultado{filteredProfessionals.length === 1 ? "" : "s"}
      </div>

      <ServicesList professionals={filteredProfessionals} />
    </div>
  )
}