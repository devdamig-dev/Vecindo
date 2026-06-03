import type { AuthState } from "@/lib/auth-context"

export type CommercialModule =
  | "home"
  | "professionalDashboard"
  | "marketplace"
  | "services"
  | "commercialSpace"
  | "help"
  | "questions"
  | "discover"
  | "community"
  | "saved"
  | "usefulInfo"
  | "subscriptions"
  | "myBusiness"
  | "serviceManagement"
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

const ALWAYS_FULL_MODULES: CommercialModule[] = ["home", "services", "discover", "community", "commercialSpace", "help", "questions", "saved", "usefulInfo", "subscriptions", "profile", "settings"]

const MODULE_LABELS: Record<CommercialModule, string> = {
  home: "Inicio",
  professionalDashboard: "Panel de servicios",
  marketplace: "Mercado",
  services: "Servicios",
  commercialSpace: "Espacio comercial",
  help: "Ayuda comunitaria",
  questions: "Preguntas",
  discover: "Descubrir",
  community: "Comunidad",
  saved: "Guardados",
  usefulInfo: "Información útil",
  subscriptions: "Planes y presencia",
  myBusiness: "Mi negocio",
  serviceManagement: "Gestionar servicios",
  profile: "Mi perfil",
  settings: "Configuración",
}

const MODULE_HREFS: Record<CommercialModule, string> = {
  home: "/dashboard",
  professionalDashboard: "/dashboard/pro",
  marketplace: "/dashboard/marketplace",
  services: "/dashboard/services",
  commercialSpace: "/dashboard/espacio-comercial",
  help: "/dashboard/comunidad",
  questions: "/dashboard/comunidad",
  discover: "/dashboard/descubrir",
  community: "/dashboard/comunidad",
  saved: "/dashboard/guardados",
  usefulInfo: "/dashboard/informacion-util",
  subscriptions: "/dashboard/suscripciones",
  myBusiness: "/dashboard/comercial",
  serviceManagement: "/dashboard/pro",
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
  if (module === "marketplace") return Boolean(auth.capabilities.canAccessMarketplace)
  return false
}

export function hasPreviewAccessToModule(_auth: AuthState | null | undefined, _module: CommercialModule) {
  return false
}

export function canAccessModule(auth: AuthState | null | undefined, module: CommercialModule) {
  return hasFullAccessToModule(auth, module)
}

export function getVisibleNavItems(auth: AuthState | null | undefined): VisibleNavItem[] {
  if (!auth) return []

  const orderedModules: CommercialModule[] = [
    "home",
    "services",
    "discover",
    "community",
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
      access: "full",
      priority: index < 4 ? "primary" : "secondary",
    }))
}

export function canAccessMarketplace(auth: AuthState | null | undefined) {
  return hasFullAccessToModule(auth, "marketplace")
}

export function canPublishMarketplaceItem(auth: AuthState | null | undefined) {
  if (!auth) return false
  return canAccessMarketplace(auth) && auth.capabilities.canSell
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
