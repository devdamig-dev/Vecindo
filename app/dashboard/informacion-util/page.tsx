import { Phone, Shield, Ambulance, Flame, Cross, Pill } from "lucide-react"

const usefulContacts = [
  {
    title: "Policía",
    description: "Emergencias y asistencia policial en la zona",
    phone: "911",
    icon: Shield,
  },
  {
    title: "Ambulancia",
    description: "Atención médica de urgencia",
    phone: "107",
    icon: Ambulance,
  },
  {
    title: "Bomberos",
    description: "Incendios, rescates y emergencias",
    phone: "100",
    icon: Flame,
  },
  {
    title: "Guardia veterinaria",
    description: "Atención de urgencia para mascotas",
    phone: "+54 11 4567-8912",
    icon: Cross,
  },
]

const pharmacies = [
  {
    name: "Farmacia Hudson Centro",
    address: "Av. Bemberg 245, Hudson",
    phone: "+54 11 4321-8899",
    status: "De turno hoy",
  },
  {
    name: "Farmacia Plaza",
    address: "Calle 48 Nº 321, Berazategui",
    phone: "+54 11 4789-5544",
    status: "Abierta hasta 22 hs",
  },
]

export default function InformacionUtilPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Información útil</h1>
        <p className="text-sm text-muted-foreground">
          Teléfonos clave y referencias rápidas de la zona
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 text-base font-semibold text-foreground">
          Contactos importantes
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {usefulContacts.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-muted/30 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>

                  <a
                    href={`tel:${item.phone.replace(/\s/g, "")}`}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    {item.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Pill className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">
            Farmacias de referencia
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {pharmacies.map((pharmacy) => (
            <div
              key={pharmacy.name}
              className="rounded-xl border border-border bg-muted/30 p-4"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{pharmacy.name}</h3>
                  <p className="text-sm text-muted-foreground">{pharmacy.address}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    {pharmacy.status}
                  </span>
                  <a
                    href={`tel:${pharmacy.phone.replace(/\s/g, "")}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {pharmacy.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Más adelante esta sección puede actualizarse automáticamente con datos de farmacias de turno.
        </p>
      </div>
    </div>
  )
}