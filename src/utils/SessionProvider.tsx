import { useEffect, useState, createContext, type ReactNode } from "react";
import { type Session } from "@supabase/supabase-js";
import supabase from "./supabase";

export const sessionContext = createContext<Session | null>(null);

export default function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <sessionContext.Provider value={session}>
      {children}
    </sessionContext.Provider>
  );
}
