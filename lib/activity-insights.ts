export type ActivityTone = "emerald" | "sky" | "violet" | "amber" | "slate"

export type ActivityInsight = {
  label: string
  tone?: ActivityTone
}

function getSeed(input: string) {
  return input.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

function pick<T>(items: T[], seed: number) {
  return items[Math.abs(seed) % items.length]
}

function range(seed: number, min: number, max: number) {
  return min + (Math.abs(seed) % (max - min + 1))
}

function plural(value: number, singular: string, pluralLabel: string) {
  return `${value} ${value === 1 ? singular : pluralLabel}`
}

export function getMarketplaceActivityInsights(id: string): ActivityInsight[] {
  const seed = getSeed(id)
  const hoursAgo = range(seed, 2, 9)
  const views = range(seed * 3, 12, 46)
  const interested = range(seed * 5, 2, 8)
  const saved = range(seed * 7, 1, 5)

  return [
    { label: `Publicado hace ${hoursAgo} hs`, tone: "slate" },
    { label: plural(views, "visualización", "visualizaciones"), tone: "emerald" },
    { label: `${interested} vecinos interesados`, tone: "emerald" },
    { label: `Guardado por ${saved} personas`, tone: "slate" },
  ]
}

export function getServiceDemandInsights(id = "service-profile"): ActivityInsight[] {
  const seed = getSeed(id)
  const searches = range(seed * 2, 28, 42)
  const weeklyInquiries = range(seed * 3, 3, 6)

  return [
    { label: `Tu perfil apareció en ${searches} búsquedas`, tone: "sky" },
    { label: `${weeklyInquiries} consultas esta semana`, tone: "sky" },
    { label: "Alta demanda en tu zona", tone: "emerald" },
    { label: "Responde rápido para mejorar posicionamiento", tone: "slate" },
  ]
}

export function getProfessionalCardInsights(id: string, category: string): ActivityInsight[] {
  const seed = getSeed(`${id}-${category}`)
  const inquiries = range(seed, 2, 5)
  const recency = pick(["Activo hoy", "Consultas recientes", "Disponible esta semana"], seed)

  return [
    { label: recency, tone: "sky" },
    { label: `${inquiries} consultas esta semana`, tone: "slate" },
  ]
}

export function getCommerceGrowthInsights(id = "my-business"): ActivityInsight[] {
  const seed = getSeed(id)
  const views = range(seed * 4, 210, 260)
  const catalogOpens = range(seed * 5, 10, 16)
  const startedOrders = range(seed * 6, 2, 4)

  return [
    { label: `+${views} visualizaciones esta semana`, tone: "violet" },
    { label: `${catalogOpens} personas abrieron tu catálogo`, tone: "violet" },
    { label: `${startedOrders} pedidos iniciados`, tone: "emerald" },
    { label: "Tu negocio apareció en Cerca tuyo", tone: "slate" },
  ]
}

export function getCommerceProfileInsights(id: string): ActivityInsight[] {
  const seed = getSeed(id)
  const views = range(seed * 4, 72, 148)
  const catalogOpens = range(seed * 5, 8, 24)

  return [
    { label: `${views} vistas esta semana`, tone: "violet" },
    { label: `${catalogOpens} abrieron catálogo`, tone: "slate" },
    { label: "Aparece en Cerca tuyo", tone: "emerald" },
  ]
}

export function getCommerceProductInsights(id: string): ActivityInsight[] {
  const seed = getSeed(id)
  const opens = range(seed * 2, 4, 15)
  const orders = range(seed * 3, 1, 3)

  return [
    { label: `${opens} vistas`, tone: "slate" },
    { label: `${orders} pedidos iniciados`, tone: "emerald" },
  ]
}

export type HomeActivityRole = "resident" | "service_provider" | "resident_business" | "external_business"

export function getHomeActivitySignals(role: HomeActivityRole): ActivityInsight[] {
  const signals: Record<HomeActivityRole, ActivityInsight[]> = {
    resident: [
      { label: "Vecinos buscando electricistas", tone: "sky" },
      { label: "Productos más vistos esta semana", tone: "emerald" },
      { label: "Nuevos comercios en tu zona", tone: "violet" },
      { label: "Servicios destacados cerca tuyo", tone: "sky" },
    ],
    service_provider: [
      { label: "34 búsquedas vinculadas a tu rubro", tone: "sky" },
      { label: "Alta demanda en Hudson", tone: "emerald" },
      { label: "Responder rápido mejora tu posición", tone: "slate" },
      { label: "Comercios podrían necesitar mantenimiento", tone: "violet" },
    ],
    resident_business: [
      { label: "Tu catálogo tuvo movimiento", tone: "violet" },
      { label: "Productos vistos esta semana", tone: "emerald" },
      { label: "Vecinos descubriendo comercios locales", tone: "violet" },
      { label: "Servicios aliados cerca tuyo", tone: "sky" },
    ],
    external_business: [
      { label: "Cerca tuyo concentra visitas locales", tone: "violet" },
      { label: "Catálogos con fotos reciben más aperturas", tone: "emerald" },
      { label: "Nuevos vecinos explorando comercios", tone: "slate" },
      { label: "Promos suaves convierten mejor", tone: "amber" },
    ],
  }

  return signals[role]
}
