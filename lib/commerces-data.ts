export type CommerceType = "commerce" | "entrepreneur"

export type CommerceReview = {
  user: string
  initials: string
  rating: number
  text: string
  date: string
  verified?: boolean
}

export type CommerceItem = {
  id: string
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
}

export const commerces: CommerceItem[] = [
  {
    id: "1",
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
      {
        user: "Lucía P.",
        initials: "LP",
        rating: 5,
        text: "Siempre responden rápido y tienen muy buena atención.",
        date: "hace 2 semanas",
        verified: true,
      },
      {
        user: "Martín G.",
        initials: "MG",
        rating: 4,
        text: "Muy práctico para resolver compras del día a día cerca de casa.",
        date: "hace 1 mes",
      },
    ],
  },
  {
    id: "2",
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
    reviews: [
      {
        user: "Ana R.",
        initials: "AR",
        rating: 5,
        text: "Riquísimo y súper cómodo para pedir por WhatsApp.",
        date: "hace 3 días",
        verified: true,
      },
    ],
  },
  {
    id: "3",
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
    reviews: [
      {
        user: "Sofía T.",
        initials: "ST",
        rating: 5,
        text: "Muy buenos productos y excelente atención en showroom.",
        date: "hace 2 meses",
      },
    ],
  },
  {
    id: "4",
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
    reviews: [
      {
        user: "Paula C.",
        initials: "PC",
        rating: 5,
        text: "Pedí una mesa y quedó espectacular. Muy buena experiencia.",
        date: "hace 1 semana",
        verified: true,
      },
    ],
  },
  {
    id: "5",
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
  },
  {
    id: "6",
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
  },
]
