import React, { useState, useEffect } from "react";
import { type Session } from "@supabase/supabase-js";
import { Navigate } from "react-router";
import supabase from "./supabase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <p>Checking authentication...</p>;

  if (!session) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
