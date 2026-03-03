import { ServicesSearch } from "@/components/services/services-search"
import { ServicesList } from "@/components/services/services-list"
import { SectionIntroBanner } from "@/components/ui/section-intro-banner"
import { NeighborRecommendations } from "@/components/services/neighbor-recommendations"

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-6 max-w-full">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Directorio de Servicios</h1>
        <p className="text-sm text-muted-foreground">{"Encontr\u00e1 profesionales verificados en tu zona"}</p>
      </div>
      <SectionIntroBanner
        sectionId="services"
        title="Profesionales verificados de tu zona"
        description={"Todos los prestadores tienen rese\u00f1as reales de vecinos."}
        howItWorks={{
          title: "\u00bfC\u00f3mo funciona Servicios?",
          steps: [
            "Busc\u00e1 por categor\u00eda o escribiendo el servicio que necesit\u00e1s.",
            "Mir\u00e1 las rese\u00f1as y puntuaciones de otros vecinos.",
            "Contact\u00e1 directamente por WhatsApp sin intermediarios.",
            "Despu\u00e9s del trabajo, dej\u00e1 tu rese\u00f1a para ayudar a otros.",
          ],
        }}
      />
      <NeighborRecommendations />
      <ServicesSearch />
      <ServicesList />
    </div>
  )
}
