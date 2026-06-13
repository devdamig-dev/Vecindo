export type NecesidadCategory =
  | "plomeria" | "electricidad" | "jardineria" | "pintura"
  | "limpieza" | "mudanza" | "educacion" | "tecnologia"
  | "cuidado" | "catering" | "diseno" | "otro"

export type NecesidadUrgencia = "inmediata" | "esta_semana" | "flexible"

export interface Necesidad {
  id: string
  userId: string
  userName: string
  userInitials: string
  title: string
  description: string
  category: NecesidadCategory
  urgency: NecesidadUrgencia
  zone: string
  respuestas: number
  postedAt: string
  budget?: string
}
