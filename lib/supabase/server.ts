/**
 * VEZI Supabase Server Client – Sprint 1 foundation
 *
 * Mock-safe: returns null when env vars are absent.
 * Only safe to import in Server Components / Route Handlers / Server Actions.
 *
 * To activate: install @supabase/supabase-js and @supabase/ssr, set env vars,
 * then uncomment the real implementation below.
 */

export type SupabaseServerClient = null

export async function createServerClient(): Promise<SupabaseServerClient> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null
  }
  // TODO Sprint 2: uncomment once @supabase/ssr is installed
  // const { createServerClient: _create } = await import("@supabase/ssr")
  // const { cookies } = await import("next/headers")
  // const cookieStore = await cookies()
  // return _create(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  //   { cookies: { getAll: () => cookieStore.getAll(), setAll: (c) => c.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } },
  // )
  return null
}

export async function createAdminClient(): Promise<SupabaseServerClient> {
  if (
    !process.env.SUPABASE_SERVICE_ROLE_KEY ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL
  ) {
    return null
  }
  // TODO Sprint 2: activate with service role key for admin operations
  return null
}
