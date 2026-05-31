/**
 * VEZI Auth Helpers – Sprint 1 foundation
 *
 * Mock-safe: all functions return null/undefined when Supabase is not configured.
 * The app continues running in mock mode via AuthContext (lib/auth-context.tsx).
 *
 * To activate: configure Supabase env vars and uncomment real implementations in Sprint 2.
 */

import { isSupabaseConfigured } from "./client"

export interface VeziUser {
  id: string
  email: string
  name?: string
}

export interface AuthSession {
  user: VeziUser
  accessToken: string
}

/** Returns the current session, or null in mock mode */
export async function getSession(): Promise<AuthSession | null> {
  if (!isSupabaseConfigured()) return null
  // TODO Sprint 2: implement with real Supabase session
  return null
}

/** Returns the current user, or null in mock mode */
export async function getCurrentUser(): Promise<VeziUser | null> {
  if (!isSupabaseConfigured()) return null
  // TODO Sprint 2: implement with real Supabase user
  return null
}

/** Signs in with email + password. No-op in mock mode. */
export async function signInWithEmail(
  _email: string,
  _password: string,
): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { error: null }
  }
  // TODO Sprint 2: implement with Supabase signInWithPassword
  return { error: "Supabase not configured" }
}

/** Signs up with email + password. No-op in mock mode. */
export async function signUpWithEmail(
  _email: string,
  _password: string,
): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { error: null }
  }
  // TODO Sprint 2: implement with Supabase signUp
  return { error: "Supabase not configured" }
}

/** Signs out. No-op in mock mode. */
export async function signOut(): Promise<void> {
  if (!isSupabaseConfigured()) return
  // TODO Sprint 2: implement with Supabase signOut
}
