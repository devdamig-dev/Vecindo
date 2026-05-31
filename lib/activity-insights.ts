export type ActivityTone = "emerald" | "sky" | "violet" | "amber" | "rose" | "slate"

export type ActivityInsight = {
  label: string
  tone?: ActivityTone
}

export type ZonalActivitySignal = ActivityInsight & {
  eyebrow: string
  description: string
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

export function getMarketplaceActivityInsights(id: string, status = "Disponible"): ActivityInsight[] {
  const seed = getSeed(id)
  const hoursAgo = range(seed, 2, 9)
  const views = range(seed * 3, 12, 46)
  const interested = range(seed * 5, 2, 8)
  const saved = range(seed * 7, 1, 5)
  const contextual = pick(
    [
      { label: "Retira hoy", tone: "emerald" as const },
      { label: "Última rebaja", tone: "amber" as const },
      { label: "Consultas abiertas", tone: "sky" as const },
    ],
    seed,
  )

  return [
    { label: status === "Reservado" ? "Reservado" : `Publicado hace ${hoursAgo} hs`, tone: status === "Reservado" ? "amber" : "slate" },
    { label: plural(views, "visualización", "visualizaciones"), tone: "slate" },
    { label: `${interested} vecinos interesados`, tone: "slate" },
    { label: `Guardado por ${saved} personas`, tone: "slate" },
    contextual,
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
  const recommended = range(seed * 2, 4, 9)
  const response = range(seed * 4, 12, 28)
  const recency = pick(["Activo hoy", "Consultas recientes", "Disponible esta semana"], seed)

  return [
    { label: recency, tone: "sky" },
    { label: `${inquiries} consultas esta semana`, tone: "slate" },
    { label: `${recommended} vecinos recomiendan este servicio`, tone: "emerald" },
    { label: `Respuesta promedio: ${response} min`, tone: "sky" },
  ]
}

export function getServiceTrustInsights(id: string): ActivityInsight[] {
  const seed = getSeed(id)
  const recommendations = range(seed * 3, 5, 12)
  const response = range(seed * 5, 12, 22)

  return [
    { label: "Nivel de confianza alto", tone: "emerald" },
    { label: `${recommendations} vecinos recomiendan este servicio`, tone: "emerald" },
    { label: `Respuesta promedio: ${response} min`, tone: "sky" },
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
    { label: "Más visto en tu zona", tone: "amber" },
  ]
}

export function getCommerceProfileInsights(id: string): ActivityInsight[] {
  const seed = getSeed(id)
  const views = range(seed * 4, 72, 148)
  const catalogOpens = range(seed * 5, 8, 24)
  const startedOrders = range(seed * 6, 1, 4)

  return [
    { label: `${views} vistas esta semana`, tone: "violet" },
    { label: `${catalogOpens} abrieron catálogo`, tone: "slate" },
    { label: `${startedOrders} pedidos iniciados`, tone: "emerald" },
    { label: "Aparece en Cerca tuyo", tone: "emerald" },
  ]
}

export function getCommerceProductInsights(id: string): ActivityInsight[] {
  const seed = getSeed(id)
  const opens = range(seed * 2, 4, 15)
  const orders = range(seed * 3, 1, 3)
  const context = pick(["Más visto en tu zona", "Retiro coordinado hoy", "Consulta reciente"], seed)

  return [
    { label: `${opens} vistas`, tone: "slate" },
    { label: `${orders} pedidos iniciados`, tone: "emerald" },
    { label: context, tone: context.includes("Más") ? "amber" : "violet" },
  ]
}

export function getAyudaCommunityInsights(id: string, status = "activo", category = "personal"): ActivityInsight[] {
  const seed = getSeed(`${id}-${category}`)
  const neighbors = range(seed * 2, 2, 7)
  const shares = range(seed * 3, 3, 12)
  const state = status === "resuelto"
    ? category === "mascotas"
      ? "Mascota encontrada"
      : "Resuelto"
    : category === "urgente"
      ? "Urgente"
      : "Vecinos colaborando"

  return [
    { label: state, tone: status === "resuelto" ? "emerald" : category === "urgente" ? "rose" : "amber" },
    { label: `${neighbors} vecinos participando`, tone: "rose" },
    { label: `${shares} difusiones en la zona`, tone: "slate" },
  ]
}

export type HomeActivityRole = "universal" | "services" | "hybrid" | "business"

export function getHomeActivitySignals(role: HomeActivityRole): ActivityInsight[] {
  const signals: Record<HomeActivityRole, ActivityInsight[]> = {
    universal: [
      { label: "Vecinos buscando electricistas", tone: "sky" },
      { label: "Productos más vistos esta semana", tone: "emerald" },
      { label: "Nuevo emprendimiento en Hudson", tone: "violet" },
      { label: "3 comercios comenzaron promociones hoy", tone: "amber" },
      { label: "Servicios destacados cerca tuyo", tone: "sky" },
    ],
    services: [
      { label: "34 búsquedas vinculadas a tu rubro", tone: "sky" },
      { label: "Alta demanda en Hudson", tone: "emerald" },
      { label: "Responder rápido mejora tu posición", tone: "slate" },
      { label: "Comercios podrían necesitar mantenimiento", tone: "violet" },
    ],
    hybrid: [
      { label: "Tu catálogo tuvo movimiento", tone: "violet" },
      { label: "Productos vistos esta semana", tone: "emerald" },
      { label: "Vecinos descubriendo comercios locales", tone: "violet" },
      { label: "Servicios aliados cerca tuyo", tone: "sky" },
    ],
    business: [
      { label: "Cerca tuyo concentra visitas locales", tone: "violet" },
      { label: "Catálogos con fotos reciben más aperturas", tone: "emerald" },
      { label: "Nuevos vecinos explorando comercios", tone: "slate" },
      { label: "Promos suaves convierten mejor", tone: "amber" },
    ],
  }

  return signals[role]
}

export function getZonalActivitySignals(role: HomeActivityRole): ZonalActivitySignal[] {
  const common: ZonalActivitySignal[] = [
    { eyebrow: "Tendencia", label: "Hogar y reparaciones", description: "Electricidad, plomería y jardinería concentraron más búsquedas locales.", tone: "sky" },
    { eyebrow: "Búsqueda frecuente", label: "Mesa, bici y herramientas", description: "Productos usados con retiro simple se están moviendo mejor esta semana.", tone: "emerald" },
    { eyebrow: "Nuevo cerca", label: "Emprendimiento en Hudson", description: "Un catálogo de pastelería se sumó a la zona con pedidos coordinados.", tone: "violet" },
  ]

  if (role === "services") {
    return [
      { eyebrow: "Demanda", label: "Consultas de mantenimiento", description: "Vecinos y comercios están buscando respuestas rápidas para arreglos chicos.", tone: "sky" },
      ...common.slice(1),
    ]
  }

  if (role === "hybrid" || role === "business") {
    return [
      { eyebrow: "Visibilidad", label: "Catálogos con movimiento", description: "Productos con foto clara y retiro simple reciben más aperturas locales.", tone: "violet" },
      { eyebrow: "Cerca tuyo", label: "Comercios recomendados", description: "Los perfiles activos aparecen mejor en recorridos barriales.", tone: "emerald" },
      common[0],
    ]
  }

  return common
}
