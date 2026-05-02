import type { AuthState } from "@/lib/auth-context"

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

export function canAccessMarketplace(auth: AuthState | null | undefined) {
  if (!auth) return false
  return auth.capabilities.canAccessMarketplace
}

export function canPublishMarketplaceItem(auth: AuthState | null | undefined) {
  if (!auth) return false
  return canAccessMarketplace(auth) && auth.capabilities.canSell
}

export function canAccessServiceManagement(auth: AuthState | null | undefined) {
  return hasServiceProviderActivity(auth)
}

export function canAccessMyBusiness(auth: AuthState | null | undefined) {
  return hasBusinessActivity(auth)
}

// Compat helper (legacy usage): commercial panel is now only business/entrepreneurship.
export function hasCommercialActivity(auth: AuthState | null | undefined) {
  return canAccessMyBusiness(auth)
}
