import type { AuthState } from "@/lib/auth-context"

export function hasCommercialActivity(auth: AuthState | null | undefined) {
  if (!auth) return false

  const marketplaceListings = auth.commercialActivity?.marketplaceListingsCount ?? 0
  const serviceListings = auth.commercialActivity?.serviceListingsCount ?? 0
  const hasEntrepreneurProfile = Boolean(auth.commercialActivity?.hasEntrepreneurProfile)
  const hasBusinessProfile = Boolean(auth.commercialActivity?.hasBusinessProfile)
  const managesCommerce = Array.isArray(auth.managesCommerceIds) && auth.managesCommerceIds.length > 0

  return marketplaceListings > 0 || serviceListings > 0 || hasEntrepreneurProfile || hasBusinessProfile || managesCommerce
}
