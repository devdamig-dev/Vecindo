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
  // Commerce management flags
  hasCommerceProfile: boolean
  managesCommerceIds: string[]
}

interface AuthContextType {
  auth: AuthState
  setAccountType: (type: AccountType) => void
  setCapability: (key: keyof UserCapabilities, value: boolean) => void
  updateProfile: (profile: Partial<UserProfile>) => void
  updateProfessionalProfile: (data: Partial<ProfessionalProfileData>) => void
  updateBusinessProfile: (data: Partial<BusinessProfileData>) => void
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
    canOfferServices: false,
    canSell: false,
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
    bio: "Residente de Hudson. Amante de la jardineria y la buena vecindad.",
    zone: "Hudson \u2013 Berazategui",
    neighborhood: "Los Ombues",
    memberSince: "Enero 2024",
  },
  professionalProfile: null,
  businessProfile: null,
  savedItems: [
    { id: "s1", type: "service", title: "Pinturas Express", subtitle: "Pintura \u00b7 4.9 estrellas", savedAt: "hace 2 d\u00edas" },
    { id: "s2", type: "marketplace", title: "Bicicleta Trek Marlin 7", subtitle: "$450.000 \u00b7 Diego P.", savedAt: "hace 3 d\u00edas" },
    { id: "s3", type: "commerce", title: "Almac\u00e9n Don Carlos", subtitle: "Almac\u00e9n \u00b7 Hudson", savedAt: "hace 1 semana" },
  ],
  // Demo: resident manages a commerce
  hasCommerceProfile: true,
  managesCommerceIds: ["1"], // Almac\u00e9n Don Carlos
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
    name: "Roberto M\u00e9ndez",
    email: "roberto.mendez@email.com",
    whatsapp: "+54 11 9876-5432",
    avatarInitials: "RM",
    bio: "Electricista matriculado con m\u00e1s de 15 a\u00f1os de experiencia.",
    zone: "Hudson \u2013 Berazategui",
    neighborhood: "",
    memberSince: "Marzo 2023",
  },
  professionalProfile: {
    category: "Electricidad",
    subcategories: ["Hogar Inteligente", "Iluminaci\u00f3n", "Emergencias"],
    description: "M\u00e1s de 15 a\u00f1os de experiencia especializado en instalaciones de hogar inteligente, iluminaci\u00f3n de piscinas, reparaciones de emergencia y mejoras completas del sistema el\u00e9ctrico.",
    matricula: "MAT-2847",
    serviceArea: "Hudson \u2013 Berazategui",
    galleryCount: 8,
  },
  businessProfile: null,
  savedItems: [],
  hasCommerceProfile: false,
  managesCommerceIds: [],
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    try {
      const stored = window.localStorage.getItem("vecindo_account_type") as AccountType | null
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
      window.localStorage.setItem("vecindo_account_type", type)
    } catch {
      // ignore
    }
  }

  const setCapability = (key: keyof UserCapabilities, value: boolean) => {
    setAuth((prev) => {
      const next = {
        ...prev,
        capabilities: { ...prev.capabilities, [key]: value },
      }
      if (key === "canOfferServices" && !value) {
        next.professionalProfile = null
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
    setAuth((prev) => ({ ...prev, profile: { ...prev.profile, ...profile } }))
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
    }))
  }

  const addProduct = (product: Omit<BusinessProduct, "id">) => {
    setAuth((prev) => ({
      ...prev,
      businessProfile: prev.businessProfile
        ? {
            ...prev.businessProfile,
            products: [
              ...prev.businessProfile.products,
              { ...product, id: Date.now().toString() },
            ],
          }
        : null,
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
    }))
  }

  const updateProduct = (id: string, data: Partial<BusinessProduct>) => {
    setAuth((prev) => ({
      ...prev,
      businessProfile: prev.businessProfile
        ? {
            ...prev.businessProfile,
            products: prev.businessProfile.products.map((p) =>
              p.id === id ? { ...p, ...data } : p
            ),
          }
        : null,
    }))
  }

  const saveItem = (item: Omit<SavedItem, "id" | "savedAt">) => {
    setAuth((prev) => ({
      ...prev,
      savedItems: [
        { ...item, id: Date.now().toString(), savedAt: "ahora" },
        ...prev.savedItems,
      ],
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
