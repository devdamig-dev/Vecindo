import type { AuthState } from "./auth-context"

export function hasCommercialActivity(auth: AuthState) {
  return (
    auth.commercialActivity.marketplaceListingsCount > 0 ||
    auth.commercialActivity.serviceListingsCount > 0 ||
    auth.commercialActivity.hasEntrepreneurProfile ||
    auth.commercialActivity.hasBusinessProfile ||
    auth.hasCommerceProfile ||
    auth.managesCommerceIds.length > 0
  )
}
