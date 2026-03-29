export type CommerceType = "commerce" | "entrepreneur"

export type CommerceReview = {
  user: string
  initials: string
  rating: number
  text: string
  date: string
  verified?: boolean
}

export type CommerceProduct = {
  id: string
  title: string
  price: string
  description: string
  image?: string
}

export type CommercePlanDraft = {
  code: "starter" | "growth" | "pro"
  productLimit: 30 | 50 | 100
}

export type CommerceItem = {
  id: string
  publicSlug: string
  type: CommerceType
  name: string
  title: string
  category: string
  description: string
  longDescription: string
  badge: string
  location: string
  address: string
  hours: string
  meta: string
  cta: string
  whatsapp: string
  phone: string
  logo: string
  bannerUrl: string
  rating: number
  reviews: CommerceReview[]
  products: CommerceProduct[]
  mapPosition?: { top: string; left: string }
  planDraft: CommercePlanDraft
}

export const commerces: CommerceItem[] = [
  {
    id: "1",
    publicSlug: "farmacia-de-la-zona",
    type: "commerce",
    name: "Farmacia de la Zona",
    title: "Farmacia de la Zona",
    category: "Farmacia",
    description: "Atención presencial, dermocosmética, perfumería y asesoramiento para vecinos.",
    longDescription:
      "Farmacia con atención de cercanía para la comunidad. Ofrece medicamentos, perfumería, dermocosmética y productos de cuidado personal con atención directa en la zona.",
    badge: "Local físico",
    location: "Berazategui",
    address: "Av. Mitre 1540, Berazategui",
    hours: "Lunes a sábado · 8 a 20 hs",
    meta: "Abierto hoy · Dirección visible",
    cta: "Ver comercio",
    whatsapp: "+54 11 2345 6789",
    phone: "+54 11 4222 1111",
    logo: "FZ",
    bannerUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviews: [
      { user: "Lucía P.", initials: "LP", rating: 5, text: "Siempre responden rápido y tienen muy buena atención.", date: "hace 2 semanas", verified: true },
      { user: "Martín G.", initials: "MG", rating: 4, text: "Muy práctico para resolver compras del día a día cerca de casa.", date: "hace 1 mes" },
    ],
    products: [
      { id: "f1", title: "Protector solar FPS 50", price: "$18.500", description: "Protección facial y corporal para uso diario." },
      { id: "f2", title: "Shampoo dermocalmante", price: "$12.900", description: "Cuidado suave para cuero cabelludo sensible." },
      { id: "f3", title: "Kit botiquín básico", price: "$24.000", description: "Gasas, cinta, desinfectante y analgésico de venta libre." },
    ],
    mapPosition: { top: "34%", left: "58%" },
    planDraft: { code: "growth", productLimit: 50 },
  },
  {
    id: "2",
    publicSlug: "punto-cafe",
    type: "commerce",
    name: "Punto Café",
    title: "Punto Café",
    category: "Cafetería",
    description: "Cafetería y pastelería con combos, promos del día y beneficios para la comunidad.",
    longDescription:
      "Cafetería de la zona con desayunos, meriendas, pastelería y promos especiales para vecinos. Ideal para retiro por local o encuentros informales.",
    badge: "Promos activas",
    location: "Plátanos",
    address: "Calle 12 845, Plátanos",
    hours: "Todos los días · 7 a 19 hs",
    meta: "Retiro por local · WhatsApp",
    cta: "Ver comercio",
    whatsapp: "+54 11 3456 7890",
    phone: "+54 11 4333 2222",
    logo: "PC",
    bannerUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviews: [{ user: "Ana R.", initials: "AR", rating: 5, text: "Riquísimo y súper cómodo para pedir por WhatsApp.", date: "hace 3 días", verified: true }],
    products: [
      { id: "c1", title: "Combo desayuno", price: "$9.800", description: "Café + medialunas para retirar por local." },
      { id: "c2", title: "Tostado especial", price: "$7.200", description: "Jamón, queso y pan de masa madre." },
      { id: "c3", title: "Box merienda", price: "$14.500", description: "Pastelería, café molido y cookies artesanales." },
    ],
    mapPosition: { top: "55%", left: "42%" },
    planDraft: { code: "starter", productLimit: 30 },
  },
  {
    id: "3",
    publicSlug: "muebleria-nordica-hudson",
    type: "commerce",
    name: "Mueblería Nórdica Hudson",
    title: "Mueblería Nórdica Hudson",
    category: "Muebles y deco",
    description: "Muebles, deco y objetos para el hogar con showroom y atención en la zona.",
    longDescription:
      "Showroom de muebles y decoración con atención personalizada. Presenta productos terminados, opciones a medida y asesoramiento para ambientación de espacios.",
    badge: "Showroom",
    location: "Hudson",
    address: "Colectora Autopista 3200, Hudson",
    hours: "Lunes a viernes · 10 a 18 hs",
    meta: "Catálogo + atención local",
    cta: "Ver comercio",
    whatsapp: "+54 11 4567 8901",
    phone: "+54 11 4444 3333",
    logo: "MN",
    bannerUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviews: [{ user: "Sofía T.", initials: "ST", rating: 5, text: "Muy buenos productos y excelente atención en showroom.", date: "hace 2 meses" }],
    products: [
      { id: "m1", title: "Mesa de comedor", price: "$420.000", description: "Hierro y tapa simil mármol, terminación mate." },
      { id: "m2", title: "Rack TV nórdico", price: "$265.000", description: "Frente de madera con estructura metálica." },
      { id: "m3", title: "Mesa ratona", price: "$145.000", description: "Minimalista, ideal living o sala de estar." },
    ],
    mapPosition: { top: "22%", left: "24%" },
    planDraft: { code: "pro", productLimit: 100 },
  },
  {
    id: "4",
    publicSlug: "mikage-deco",
    type: "entrepreneur",
    name: "Mikage Deco",
    title: "Mikage Deco",
    category: "Emprendimiento de deco",
    description: "Mesas, racks y muebles a pedido hechos por un emprendimiento local con entregas coordinadas.",
    longDescription:
      "Proyecto independiente enfocado en mesas, racks y muebles a pedido. Trabaja por catálogo y coordinación directa, sin local físico pero con atención activa en la zona.",
    badge: "Catálogo",
    location: "Zona Hudson - Berazategui",
    address: "Entrega coordinada en la zona",
    hours: "Atención por WhatsApp · Lunes a sábado",
    meta: "Sin local físico · Respuesta por WhatsApp",
    cta: "Ver emprendimiento",
    whatsapp: "+54 11 5678 9012",
    phone: "+54 11 5678 9012",
    logo: "MD",
    bannerUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviews: [{ user: "Paula C.", initials: "PC", rating: 5, text: "Pedí una mesa y quedó espectacular. Muy buena experiencia.", date: "hace 1 semana", verified: true }],
    products: [
      { id: "e1", title: "Mesa de arrime", price: "$98.000", description: "Diseño compacto para living o dormitorio." },
      { id: "e2", title: "Rack de TV a medida", price: "$240.000", description: "Medidas personalizadas según tu espacio." },
      { id: "e3", title: "Consola recibidor", price: "$136.000", description: "Modelo liviano con hierro y madera." },
    ],
    planDraft: { code: "growth", productLimit: 50 },
  },
  {
    id: "5",
    publicSlug: "luna-ceramica",
    type: "entrepreneur",
    name: "Luna Cerámica",
    title: "Luna Cerámica",
    category: "Cerámica artesanal",
    description: "Piezas artesanales para el hogar, regalos y deco realizadas por encargo.",
    longDescription:
      "Emprendimiento local de cerámica artesanal con piezas decorativas, regalos y objetos para el hogar. Produce por pedido y coordina entregas dentro de la comunidad y alrededores.",
    badge: "Hecho a pedido",
    location: "Zona Hudson - Berazategui",
    address: "Entrega coordinada en la zona",
    hours: "Pedidos por mensaje directo y WhatsApp",
    meta: "Producción local · Entregas coordinadas",
    cta: "Ver emprendimiento",
    whatsapp: "+54 11 6789 0123",
    phone: "+54 11 6789 0123",
    logo: "LC",
    bannerUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    reviews: [],
    products: [
      { id: "lc1", title: "Set de tazas x2", price: "$28.000", description: "Cerámica artesanal esmaltada." },
      { id: "lc2", title: "Cuenco decorativo", price: "$16.500", description: "Ideal centro de mesa o regalo." },
      { id: "lc3", title: "Vela en recipiente cerámico", price: "$19.800", description: "Pieza funcional hecha por encargo." },
    ],
    planDraft: { code: "starter", productLimit: 30 },
  },
  {
    id: "6",
    publicSlug: "dulce-sur",
    type: "entrepreneur",
    name: "Dulce Sur",
    title: "Dulce Sur",
    category: "Pastelería por encargo",
    description: "Tortas, boxes y mesas dulces personalizadas para cumpleaños y fechas especiales.",
    longDescription:
      "Proyecto gastronómico local enfocado en tortas y mesas dulces para celebraciones. Trabaja a pedido y coordina entregas o retiros según cada caso.",
    badge: "Por encargo",
    location: "Zona Hudson - Berazategui",
    address: "Entrega o retiro a coordinar",
    hours: "Pedidos anticipados",
    meta: "Pedidos anticipados · Atención directa",
    cta: "Ver emprendimiento",
    whatsapp: "+54 11 7890 1234",
    phone: "+54 11 7890 1234",
    logo: "DS",
    bannerUrl: "https://images.unsplash.com/photo-1559622214-f8a9850965bb?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviews: [],
    products: [
      { id: "d1", title: "Torta alta personalizada", price: "$68.000", description: "Decoración temática para 20 personas." },
      { id: "d2", title: "Box brunch", price: "$24.500", description: "Pastelería variada para regalar." },
      { id: "d3", title: "Mini mesa dulce", price: "$84.000", description: "Combo para eventos chicos." },
    ],
    planDraft: { code: "growth", productLimit: 50 },
  },
]

export function getCommerceById(id: string) {
  return commerces.find((commerce) => commerce.id === id)
}

export function getCommerceBySlug(slug: string) {
  return commerces.find((commerce) => commerce.publicSlug === slug)
}
