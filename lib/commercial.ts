import type { AuthState } from "@/lib/auth-context"

export function hasCommercialActivity(auth: AuthState | null | undefined) {
  if (!auth) return false

  const hasServices = Boolean(auth.professionalProfile)
  const hasBusinessProfile = Boolean(auth.businessProfile)
  const hasManagedCommerce = Array.isArray(auth.managesCommerceIds) && auth.managesCommerceIds.length > 0
  const canSell = Boolean(auth.capabilities?.canSell)
  const canOfferServices = Boolean(auth.capabilities?.canOfferServices)

  return hasServices || hasBusinessProfile || hasManagedCommerce || canSell || canOfferServices
}
