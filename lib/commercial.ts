import type { AuthState } from "@/lib/auth-context"

export type CommercialModule =
  | "home"
  | "professionalDashboard"
  | "marketplace"
  | "services"
  | "commercialSpace"
  | "help"
  | "questions"
  | "saved"
  | "usefulInfo"
  | "subscriptions"
  | "myBusiness"
  | "serviceManagement"
  | "profile"
  | "settings"

export type UserPrimaryRole = "resident" | "service_provider" | "external_business" | "resident_business"

export interface VisibleNavItem {
  label: string
  href: string
  module: CommercialModule
  access: "full" | "preview"
  priority: "primary" | "secondary"
}

const COMMUNITY_MODULES: CommercialModule[] = [
  "home",
  "marketplace",
  "services",
  "commercialSpace",
  "help",
  "questions",
  "saved",
  "usefulInfo",
  "subscriptions",
  "profile",
  "settings",
]

const ALWAYS_FULL_MODULES: CommercialModule[] = ["profile", "settings", "subscriptions"]

const MODULE_LABELS: Record<CommercialModule, string> = {
  home: "Inicio",
  professionalDashboard: "Gestionar servicios",
  marketplace: "Mercado",
  services: "Servicios",
  commercialSpace: "Espacio comercial",
  help: "Ayuda comunitaria",
  questions: "Comunidad",
  saved: "Guardados",
  usefulInfo: "Información útil",
  subscriptions: "Suscripciones",
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
  help: "/dashboard/ayuda",
  questions: "/dashboard/questions",
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
  if (isResident(auth)) {
    return hasBusinessActivity(auth) ? "resident_business" : "resident"
  }

  if (hasBusinessActivity(auth)) return "external_business"
  return "service_provider"
}

export function hasFullAccessToModule(auth: AuthState | null | undefined, module: CommercialModule) {
  if (!auth) return false

  if (ALWAYS_FULL_MODULES.includes(module)) return true

  if (isResident(auth)) {
    if (COMMUNITY_MODULES.includes(module)) return true
    if (module === "myBusiness") return hasBusinessActivity(auth)
    if (module === "serviceManagement" || module === "professionalDashboard") return hasServiceProviderActivity(auth)
    return false
  }

  if (hasServiceProviderActivity(auth) && (module === "services" || module === "serviceManagement" || module === "professionalDashboard")) {
    return true
  }

  if (hasBusinessActivity(auth) && module === "myBusiness") {
    return true
  }

  return false
}

export function hasPreviewAccessToModule(auth: AuthState | null | undefined, module: CommercialModule) {
  if (!auth || hasFullAccessToModule(auth, module)) return false

  const role = getUserPrimaryRole(auth)

  if (role === "service_provider") {
    return module === "commercialSpace"
  }

  if (role === "external_business") {
    return module === "services" || module === "commercialSpace"
  }

  return false
}

export function canAccessModule(auth: AuthState | null | undefined, module: CommercialModule) {
  return hasFullAccessToModule(auth, module) || hasPreviewAccessToModule(auth, module)
}

export function getVisibleNavItems(auth: AuthState | null | undefined): VisibleNavItem[] {
  if (!auth) return []

  const role = getUserPrimaryRole(auth)
  const roleModules: CommercialModule[] =
    role === "resident" || role === "resident_business"
      ? ["home", "marketplace", "services", "commercialSpace", "help", "questions", "saved", "usefulInfo", "subscriptions", "profile", "settings", "myBusiness", "serviceManagement"]
      : role === "service_provider"
        ? ["services", "serviceManagement", "commercialSpace", "subscriptions", "profile", "settings"]
        : ["myBusiness", "commercialSpace", "services", "serviceManagement", "subscriptions", "profile", "settings"]

  return roleModules
    .filter((module) => canAccessModule(auth, module))
    .map((module, index) => ({
      label: MODULE_LABELS[module],
      href: MODULE_HREFS[module],
      module,
      access: hasFullAccessToModule(auth, module) ? "full" : "preview",
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

// Compat helper (legacy usage): commercial panel is now only business/entrepreneurship.
export function hasCommercialActivity(auth: AuthState | null | undefined) {
  return canAccessMyBusiness(auth)
}
