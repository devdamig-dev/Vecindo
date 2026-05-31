/**
 * VEZI Supabase Client – Sprint 1 foundation
 *
 * Mock-safe: returns null when NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
 * are not set, so the app keeps running in mock mode without the SDK installed.
 *
 * To activate: install @supabase/supabase-js and @supabase/ssr, set env vars,
 * then uncomment the real implementation below.
 */

// ─── Mock-safe stub ───────────────────────────────────────────────────────────

export type SupabaseClient = null

export function createBrowserClient(): SupabaseClient {
  if (
    typeof process === "undefined" ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null
  }
  // TODO Sprint 2: uncomment once @supabase/ssr is installed
  // const { createBrowserClient: _create } = await import("@supabase/ssr")
  // return _create(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  // )
  return null
}

export function getSupabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  )
}
