import type { AuthState } from "@/lib/auth-context"

export function hasCommercialActivity(auth: AuthState | null | undefined) {
  if (!auth) return false

  const activity = auth.commercialActivity

  const hasMarketplaceListings = (activity?.marketplaceListingsCount ?? 0) > 0
  const hasServiceListings = (activity?.serviceListingsCount ?? 0) > 0
  const hasEntrepreneurProfile = Boolean(activity?.hasEntrepreneurProfile)
  const hasBusinessProfile = Boolean(activity?.hasBusinessProfile)
  const hasManagedCommerce = Array.isArray(auth.managesCommerceIds) && auth.managesCommerceIds.length > 0

  return (
    hasMarketplaceListings ||
    hasServiceListings ||
    hasEntrepreneurProfile ||
    hasBusinessProfile ||
    hasManagedCommerce
  )
}
