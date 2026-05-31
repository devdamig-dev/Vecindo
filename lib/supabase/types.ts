/**
 * VEZI Database Schema Types
 * Sprint 1 foundation – mock-safe, no SDK imports.
 * Replace with generated types from `supabase gen types typescript` once backend is live.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          zone: string | null
          whatsapp: string | null
          bio: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          zone?: string | null
          whatsapp?: string | null
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>
      }
      services: {
        Row: {
          id: string
          provider_id: string
          category: string
          title: string
          description: string
          zone: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          provider_id: string
          category: string
          title: string
          description: string
          zone: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>
      }
      businesses: {
        Row: {
          id: string
          owner_id: string
          name: string
          description: string
          whatsapp: string | null
          zone: string
          type: "commerce" | "entrepreneur"
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          description: string
          whatsapp?: string | null
          zone: string
          type: "commerce" | "entrepreneur"
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["businesses"]["Insert"]>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      user_plan: "free" | "services_pro" | "business" | "sponsor"
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]

export type InsertDto<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"]

export type UpdateDto<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"]
