import type { AuthState } from "@/lib/auth-context"

export type CommercialModule =
  | "home"
  | "necesito"
  | "servicios"
  | "comercios"
  | "emprendimientos"
  | "myBusiness"
  | "serviceManagement"
  | "professionalDashboard"
  | "saved"
  | "usefulInfo"
  | "subscriptions"
  | "profile"
  | "settings"

export type UserPrimaryRole = "universal" | "services" | "business" | "hybrid"

export interface VisibleNavItem {
  label: string
  href: string
  module: CommercialModule
  access: "full" | "preview"
  priority: "primary" | "secondary"
}

const ALWAYS_FULL_MODULES: CommercialModule[] = [
  "home", "necesito", "servicios", "comercios", "emprendimientos",
  "saved", "usefulInfo", "subscriptions", "profile", "settings",
]

const MODULE_LABELS: Record<CommercialModule, string> = {
  home: "Novedades",
  necesito: "Necesito",
  servicios: "Servicios",
  comercios: "Comercios",
  emprendimientos: "Emprendimientos",
  myBusiness: "Mi negocio",
  serviceManagement: "Gestionar servicios",
  professionalDashboard: "Panel profesional",
  saved: "Guardados",
  usefulInfo: "Información útil",
  subscriptions: "Planes",
  profile: "Mi perfil",
  settings: "Configuración",
}

const MODULE_HREFS: Record<CommercialModule, string> = {
  home: "/dashboard",
  necesito: "/dashboard/necesito",
  servicios: "/dashboard/servicios",
  comercios: "/dashboard/comercios",
  emprendimientos: "/dashboard/emprendimientos",
  myBusiness: "/dashboard/comercial",
  serviceManagement: "/dashboard/pro",
  professionalDashboard: "/dashboard/pro",
  saved: "/dashboard/guardados",
  usefulInfo: "/dashboard/informacion-util",
  subscriptions: "/dashboard/suscripciones",
  profile: "/dashboard/profile",
  settings: "/dashboard/settings",
}

export function isResident(auth: AuthState | null | undefined) {
  return auth?.accountType === "resident"
}

export function hasServiceProviderActivity(auth: AuthState | null | undefined) {
  if (!auth) return false
  const serviceListings = auth.commercialActivity?.serviceListingsCount ?? 0
  return auth.capabilities.canOfferServices || Boolean(auth.professionalProfile) || serviceListings > 0
}

export function hasBusinessActivity(auth: AuthState | null | undefined) {
  if (!auth) return false
  const hasBusinessProfile = Boolean(auth.commercialActivity?.hasBusinessProfile || auth.businessProfile)
  const hasEntrepreneurProfile = Boolean(auth.commercialActivity?.hasEntrepreneurProfile)
  const managesCommerce = Array.isArray(auth.managesCommerceIds) && auth.managesCommerceIds.length > 0
  return hasBusinessProfile || hasEntrepreneurProfile || managesCommerce || auth.hasCommerceProfile
}

export function getUserPrimaryRole(auth: AuthState | null | undefined): UserPrimaryRole {
  const services = hasServiceProviderActivity(auth)
  const business = hasBusinessActivity(auth)
  if (services && business) return "hybrid"
  if (business) return "business"
  if (services) return "services"
  return "universal"
}

export function hasFullAccessToModule(auth: AuthState | null | undefined, module: CommercialModule) {
  if (!auth) return false
  if (ALWAYS_FULL_MODULES.includes(module)) return true
  if (module === "serviceManagement" || module === "professionalDashboard") return hasServiceProviderActivity(auth)
  if (module === "myBusiness") return hasBusinessActivity(auth)
  return false
}

export function canAccessModule(auth: AuthState | null | undefined, module: CommercialModule) {
  return hasFullAccessToModule(auth, module)
}

export function getVisibleNavItems(auth: AuthState | null | undefined): VisibleNavItem[] {
  if (!auth) return []

  const orderedModules: CommercialModule[] = [
    "home",
    "necesito",
    "servicios",
    "comercios",
    "emprendimientos",
    "myBusiness",
    "serviceManagement",
    "saved",
    "usefulInfo",
    "subscriptions",
    "profile",
    "settings",
  ]

  return orderedModules
    .filter((module) => canAccessModule(auth, module))
    .map((module, index) => ({
      label: MODULE_LABELS[module],
      href: MODULE_HREFS[module],
      module,
      access: "full" as const,
      priority: index < 5 ? "primary" : "secondary",
    }))
}

export function canAccessServiceManagement(auth: AuthState | null | undefined) {
  return hasFullAccessToModule(auth, "serviceManagement")
}

export function canAccessMyBusiness(auth: AuthState | null | undefined) {
  return hasFullAccessToModule(auth, "myBusiness")
}

export function hasCommercialActivity(auth: AuthState | null | undefined) {
  return canAccessMyBusiness(auth)
}
