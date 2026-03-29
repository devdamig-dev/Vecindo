"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type AccountType = "resident" | "external_professional"

export interface UserCapabilities {
  canOfferServices: boolean
  canSell: boolean
  canPostPets: boolean
  canPostZoneUpdates: boolean
  canAccessMarketplace: boolean
  canAccessPets: boolean
  canPublishQuestions: boolean
}

export interface UserProfile {
  name: string
  email: string
  whatsapp: string
  avatarInitials: string
  avatarUrl?: string
  bio: string
  zone: string
  neighborhood: string
  memberSince: string
}

export interface ProfessionalProfileData {
  category: string
  subcategories: string[]
  description: string
  matricula: string
  serviceArea: string
  galleryCount: number
}

export interface BusinessProfileData {
  businessName: string
  description: string
  whatsapp: string
  bannerImage: string
  products: BusinessProduct[]
}

export interface BusinessProduct {
  id: string
  title: string
  price: string
  description: string
  image: string
}

export interface CommercialActivity {
  marketplaceListingsCount: number
  serviceListingsCount: number
  hasEntrepreneurProfile: boolean
  hasBusinessProfile: boolean
}

export type SavedItemType = "service" | "marketplace" | "zone_update" | "commerce" | "ayuda"

export interface SavedItem {
  id: string
  type: SavedItemType
  title: string
  subtitle: string
  savedAt: string
}

export interface AuthState {
  accountType: AccountType
  capabilities: UserCapabilities
  profile: UserProfile
  professionalProfile: ProfessionalProfileData | null
  businessProfile: BusinessProfileData | null
  savedItems: SavedItem[]
  hasCommerceProfile: boolean
  managesCommerceIds: string[]
  commercialActivity: CommercialActivity
}

interface AuthContextType {
  auth: AuthState
  setAccountType: (type: AccountType) => void
  setCapability: (key: keyof UserCapabilities, value: boolean) => void
  updateProfile: (profile: Partial<UserProfile>) => void
  updateProfessionalProfile: (data: Partial<ProfessionalProfileData>) => void
  updateBusinessProfile: (data: Partial<BusinessProfileData>) => void
  updateCommercialActivity: (data: Partial<CommercialActivity>) => void
  addProduct: (product: Omit<BusinessProduct, "id">) => void
  removeProduct: (id: string) => void
  updateProduct: (id: string, data: Partial<BusinessProduct>) => void
  saveItem: (item: Omit<SavedItem, "id" | "savedAt">) => void
  removeSavedItem: (id: string) => void
  isSaved: (title: string) => boolean
}

const defaultResident: AuthState = {
  accountType: "resident",
  capabilities: {
    canOfferServices: true,
    canSell: true,
    canPostPets: true,
    canPostZoneUpdates: true,
    canAccessMarketplace: true,
    canAccessPets: true,
    canPublishQuestions: true,
  },
  profile: {
    name: "Maria Gonzalez",
    email: "maria.gonzalez@email.com",
    whatsapp: "+54 11 2345-6789",
    avatarInitials: "MG",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    bio: "Residente de Hudson. Amante de la jardineria y la buena vecindad.",
    zone: "Hudson – Berazategui",
    neighborhood: "Los Ombues",
    memberSince: "Enero 2024",
  },
  professionalProfile: {
    category: "Diseño de interiores",
    subcategories: ["Asesoramiento", "Muebles a medida"],
    description:
      "Asesoramiento y diseño para espacios del hogar, con foco en muebles y ambientación.",
    matricula: "",
    serviceArea: "Hudson – Berazategui",
    galleryCount: 4,
  },
  businessProfile: {
    businessName: "Mikage Deco",
    description:
      "Emprendimiento local de muebles y objetos de diseño para el hogar.",
    whatsapp: "+54 11 2345-6789",
    bannerImage: "",
    products: [
      {
        id: "1",
        title: "Mesa de comedor",
        price: "$420.000",
        description: "Mesa de hierro con tapa simil mármol.",
        image: "",
      },
    ],
  },
  savedItems: [
    { id: "s1", type: "service", title: "Pinturas Express", subtitle: "Pintura · 4.9 estrellas", savedAt: "hace 2 días" },
    { id: "s2", type: "marketplace", title: "Bicicleta Trek Marlin 7", subtitle: "$450.000 · Diego P.", savedAt: "hace 3 días" },
    { id: "s3", type: "commerce", title: "Almacén Don Carlos", subtitle: "Almacén · Hudson", savedAt: "hace 1 semana" },
  ],
  hasCommerceProfile: true,
  managesCommerceIds: ["1"],
  commercialActivity: {
    marketplaceListingsCount: 2,
    serviceListingsCount: 1,
    hasEntrepreneurProfile: true,
    hasBusinessProfile: false,
  },
}

const defaultExternal: AuthState = {
  accountType: "external_professional",
  capabilities: {
    canOfferServices: true,
    canSell: false,
    canPostPets: false,
    canPostZoneUpdates: false,
    canAccessMarketplace: false,
    canAccessPets: false,
    canPublishQuestions: false,
  },
  profile: {
    name: "Roberto Méndez",
    email: "roberto.mendez@email.com",
    whatsapp: "+54 11 9876-5432",
    avatarInitials: "RM",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    bio: "Electricista matriculado con más de 15 años de experiencia.",
    zone: "Hudson – Berazategui",
    neighborhood: "",
    memberSince: "Marzo 2023",
  },
  professionalProfile: {
    category: "Electricidad",
    subcategories: ["Hogar Inteligente", "Iluminación", "Emergencias"],
    description:
      "Más de 15 años de experiencia especializado en instalaciones de hogar inteligente, iluminación de piscinas, reparaciones de emergencia y mejoras completas del sistema eléctrico.",
    matricula: "MAT-2847",
    serviceArea: "Hudson – Berazategui",
    galleryCount: 8,
  },
  businessProfile: null,
  savedItems: [],
  hasCommerceProfile: false,
  managesCommerceIds: [],
  commercialActivity: {
    marketplaceListingsCount: 0,
    serviceListingsCount: 3,
    hasEntrepreneurProfile: false,
    hasBusinessProfile: false,
  },
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    try {
      const stored = window.localStorage.getItem("vezi_account_type") as AccountType | null
      if (stored === "external_professional") return defaultExternal
      return defaultResident
    } catch {
      return defaultResident
    }
  })

  const setAccountType = (type: AccountType) => {
    if (type === "resident") {
      setAuth(defaultResident)
    } else {
      setAuth(defaultExternal)
    }

    try {
      window.localStorage.setItem("vezi_account_type", type)
    } catch {}
  }

  const setCapability = (key: keyof UserCapabilities, value: boolean) => {
    setAuth((prev) => {
      const next = {
        ...prev,
        capabilities: { ...prev.capabilities, [key]: value },
      }

      if (key === "canOfferServices" && !value) {
        next.professionalProfile = null
        next.commercialActivity = {
          ...next.commercialActivity,
          serviceListingsCount: 0,
        }
      }

      if (key === "canOfferServices" && value && !next.professionalProfile) {
        next.professionalProfile = {
          category: "",
          subcategories: [],
          description: "",
          matricula: "",
          serviceArea: prev.profile.zone,
          galleryCount: 0,
        }
      }

      if (key === "canSell" && !value) {
        next.businessProfile = null
        next.commercialActivity = {
          ...next.commercialActivity,
          marketplaceListingsCount: 0,
          hasBusinessProfile: false,
        }
      }

      if (key === "canSell" && value && !next.businessProfile) {
        next.businessProfile = {
          businessName: "",
          description: "",
          whatsapp: prev.profile.whatsapp,
          bannerImage: "",
          products: [],
        }
      }

      return next
    })
  }

  const updateProfile = (profile: Partial<UserProfile>) => {
    setAuth((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profile },
    }))
  }

  const updateProfessionalProfile = (data: Partial<ProfessionalProfileData>) => {
    setAuth((prev) => ({
      ...prev,
      professionalProfile: prev.professionalProfile
        ? { ...prev.professionalProfile, ...data }
        : null,
    }))
  }

  const updateBusinessProfile = (data: Partial<BusinessProfileData>) => {
    setAuth((prev) => ({
      ...prev,
      businessProfile: prev.businessProfile
        ? { ...prev.businessProfile, ...data }
        : null,
      commercialActivity: {
        ...prev.commercialActivity,
        hasBusinessProfile: true,
      },
    }))
  }

  const updateCommercialActivity = (data: Partial<CommercialActivity>) => {
    setAuth((prev) => ({
      ...prev,
      commercialActivity: {
        ...prev.commercialActivity,
        ...data,
      },
    }))
  }

  const addProduct = (product: Omit<BusinessProduct, "id">) => {
    setAuth((prev) => ({
      ...prev,
      businessProfile: prev.businessProfile
        ? {
            ...prev.businessProfile,
            products: [...prev.businessProfile.products, { ...product, id: Date.now().toString() }],
          }
        : null,
      commercialActivity: {
        ...prev.commercialActivity,
        marketplaceListingsCount: prev.commercialActivity.marketplaceListingsCount + 1,
        hasBusinessProfile: true,
      },
    }))
  }

  const removeProduct = (id: string) => {
    setAuth((prev) => ({
      ...prev,
      businessProfile: prev.businessProfile
        ? {
            ...prev.businessProfile,
            products: prev.businessProfile.products.filter((p) => p.id !== id),
          }
        : null,
      commercialActivity: {
        ...prev.commercialActivity,
        marketplaceListingsCount: Math.max(0, prev.commercialActivity.marketplaceListingsCount - 1),
      },
    }))
  }

  const updateProduct = (id: string, data: Partial<BusinessProduct>) => {
    setAuth((prev) => ({
      ...prev,
      businessProfile: prev.businessProfile
        ? {
            ...prev.businessProfile,
            products: prev.businessProfile.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
          }
        : null,
    }))
  }

  const saveItem = (item: Omit<SavedItem, "id" | "savedAt">) => {
    setAuth((prev) => ({
      ...prev,
      savedItems: [{ ...item, id: Date.now().toString(), savedAt: "ahora" }, ...prev.savedItems],
    }))
  }

  const removeSavedItem = (id: string) => {
    setAuth((prev) => ({
      ...prev,
      savedItems: prev.savedItems.filter((s) => s.id !== id),
    }))
  }

  const isSaved = (title: string) => {
    return auth.savedItems.some((s) => s.title === title)
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAccountType,
        setCapability,
        updateProfile,
        updateProfessionalProfile,
        updateBusinessProfile,
        updateCommercialActivity,
        addProduct,
        removeProduct,
        updateProduct,
        saveItem,
        removeSavedItem,
        isSaved,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return ctx
}
