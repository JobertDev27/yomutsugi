import { useState, useEffect } from "react";
import { createClient, type Session } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string
);

export default function Test() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [session, setSession] = useState<Session | null>(null);

  // Check URL params on initial render
  const params = new URLSearchParams(window.location.search);
  const hasTokenHash = params.get("token_hash");

  const [verifying, setVerifying] = useState<boolean>(!!hasTokenHash);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token_hash = params.get("token_hash");
    const type = params.get("type");

    if (token_hash) {
      supabase.auth
        .verifyOtp({
          token_hash,
          type: (type as "email") || "email",
        })
        .then(({ error }) => {
          if (error) {
            setAuthError(error.message);
          } else {
            setAuthSuccess(true);
            window.history.replaceState({}, document.title, "/library");
          }
          setVerifying(false);
        });
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for the login link!");
    }

    setLoading(false);
  };

  const handleLogout = async (): Promise<void> => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (verifying) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>Confirming your magic link...</p>
        <p>Loading...</p>
      </div>
    );
  }

  if (authError) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>✗ Authentication failed</p>
        <p>{authError}</p>
        <button
          onClick={() => {
            setAuthError(null);
            window.history.replaceState({}, document.title, "/");
          }}
        >
          Return to login
        </button>
      </div>
    );
  }

  if (authSuccess && !session) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>✓ Authentication successful!</p>
        <p>Loading your account...</p>
      </div>
    );
  }

  if (session) {
    return (
      <div>
        <h1>Welcome!</h1>
        <p>You are logged in as: {session.user.email}</p>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Supabase + React</h1>
      <p>Sign in via magic link with your email below</p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button disabled={loading}>
          {loading ? "Loading" : "Send magic link"}
        </button>
      </form>
    </div>
  );
}
