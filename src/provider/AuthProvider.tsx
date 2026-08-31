import type { JwtPayload } from "@supabase/supabase-js"
import { createContext, useEffect, useState } from "react"
import {supabase} from "../utils/supabase.ts"

export const AuthContext = createContext<JwtPayload | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [claims, setClaims] = useState<JwtPayload | null>(null)

  useEffect(() => {
    supabase.auth.getClaims().then(({ data }) => {
      setClaims(data?.claims ?? null)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getClaims().then(({ data }) => {
        setClaims(data?.claims ?? null)
      })
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={claims}>
      {children}
    </AuthContext.Provider>
  )
}
