"use client"

import { useCallback, useEffect, useState } from "react"

export type CommerceEventType =
  | "commerce_profile_view"
  | "commerce_whatsapp_click"
  | "commerce_call_click"
  | "commerce_search_impression"
  | "commerce_save"

interface AnalyticsEvent {
  timestamp: number
  eventType: CommerceEventType
  commerceId: string
}

interface CommerceStats {
  profileViews: number
  whatsappClicks: number
  callClicks: number
  searchImpressions: number
  saves: number
}

interface DailyStats {
  date: string
  profileViews: number
  whatsappClicks: number
  callClicks: number
}

const STORAGE_KEY = "vecindo_commerce_analytics"

function getStoredEvents(): AnalyticsEvent[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function storeEvents(events: AnalyticsEvent[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  } catch {
    // Storage full or unavailable
  }
}

export function useCommerceAnalytics() {
  const trackEvent = useCallback((eventType: CommerceEventType, commerceId: string) => {
    const events = getStoredEvents()
    const newEvent: AnalyticsEvent = {
      timestamp: Date.now(),
      eventType,
      commerceId,
    }
    // Keep only last 1000 events to avoid storage issues
    const updatedEvents = [...events, newEvent].slice(-1000)
    storeEvents(updatedEvents)
  }, [])

  const trackProfileView = useCallback((commerceId: string) => {
    trackEvent("commerce_profile_view", commerceId)
  }, [trackEvent])

  const trackWhatsAppClick = useCallback((commerceId: string) => {
    trackEvent("commerce_whatsapp_click", commerceId)
  }, [trackEvent])

  const trackCallClick = useCallback((commerceId: string) => {
    trackEvent("commerce_call_click", commerceId)
  }, [trackEvent])

  const trackSearchImpression = useCallback((commerceId: string) => {
    trackEvent("commerce_search_impression", commerceId)
  }, [trackEvent])

  const trackSave = useCallback((commerceId: string) => {
    trackEvent("commerce_save", commerceId)
  }, [trackEvent])

  return {
    trackProfileView,
    trackWhatsAppClick,
    trackCallClick,
    trackSearchImpression,
    trackSave,
  }
}

export function useCommerceStats(commerceId: string, days: 7 | 30 = 7) {
  const [stats, setStats] = useState<CommerceStats>({
    profileViews: 0,
    whatsappClicks: 0,
    callClicks: 0,
    searchImpressions: 0,
    saves: 0,
  })
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const events = getStoredEvents()
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
    const filtered = events.filter(
      (e) => e.commerceId === commerceId && e.timestamp >= cutoff
    )

    const computed: CommerceStats = {
      profileViews: filtered.filter((e) => e.eventType === "commerce_profile_view").length,
      whatsappClicks: filtered.filter((e) => e.eventType === "commerce_whatsapp_click").length,
      callClicks: filtered.filter((e) => e.eventType === "commerce_call_click").length,
      searchImpressions: filtered.filter((e) => e.eventType === "commerce_search_impression").length,
      saves: filtered.filter((e) => e.eventType === "commerce_save").length,
    }

    // Generate daily breakdown for chart
    const dailyMap = new Map<string, DailyStats>()
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      const dateStr = date.toLocaleDateString("es-AR", { day: "2-digit", month: "short" })
      dailyMap.set(dateStr, { date: dateStr, profileViews: 0, whatsappClicks: 0, callClicks: 0 })
    }

    filtered.forEach((event) => {
      const date = new Date(event.timestamp)
      const dateStr = date.toLocaleDateString("es-AR", { day: "2-digit", month: "short" })
      const existing = dailyMap.get(dateStr)
      if (existing) {
        if (event.eventType === "commerce_profile_view") existing.profileViews++
        if (event.eventType === "commerce_whatsapp_click") existing.whatsappClicks++
        if (event.eventType === "commerce_call_click") existing.callClicks++
      }
    })

    setStats(computed)
    setDailyStats(Array.from(dailyMap.values()))
    setIsLoading(false)
  }, [commerceId, days])

  return { stats, dailyStats, isLoading }
}

// Seed mock data for demo purposes
export function seedMockAnalytics(commerceId: string) {
  const events = getStoredEvents()
  const existingForCommerce = events.filter((e) => e.commerceId === commerceId)
  
  // Only seed if no existing data
  if (existingForCommerce.length > 20) return

  const mockEvents: AnalyticsEvent[] = []
  const now = Date.now()

  // Generate 30 days of mock data
  for (let day = 0; day < 30; day++) {
    const dayTimestamp = now - day * 24 * 60 * 60 * 1000
    
    // Random number of events per day
    const profileViews = Math.floor(Math.random() * 8) + 2
    const whatsappClicks = Math.floor(Math.random() * 3)
    const callClicks = Math.floor(Math.random() * 2)
    const impressions = Math.floor(Math.random() * 15) + 5

    for (let i = 0; i < profileViews; i++) {
      mockEvents.push({
        timestamp: dayTimestamp + Math.random() * 86400000,
        eventType: "commerce_profile_view",
        commerceId,
      })
    }
    for (let i = 0; i < whatsappClicks; i++) {
      mockEvents.push({
        timestamp: dayTimestamp + Math.random() * 86400000,
        eventType: "commerce_whatsapp_click",
        commerceId,
      })
    }
    for (let i = 0; i < callClicks; i++) {
      mockEvents.push({
        timestamp: dayTimestamp + Math.random() * 86400000,
        eventType: "commerce_call_click",
        commerceId,
      })
    }
    for (let i = 0; i < impressions; i++) {
      mockEvents.push({
        timestamp: dayTimestamp + Math.random() * 86400000,
        eventType: "commerce_search_impression",
        commerceId,
      })
    }
  }

  storeEvents([...events, ...mockEvents])
}
