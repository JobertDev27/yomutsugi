import { Link, useNavigate } from "react-router";
import "./header.css";
import { createClient, type Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string,
);

export default function Header() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>();

  const handleLogout = async (): Promise<void> => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
  }, []);

  return (
    <header>
      <section className="header-title">
        <h1>YOMUTSUGI</h1>
      </section>
      <section className="header-nav">
        <nav className="glow">
          <Link to={"/shows"}>EXPLORE</Link>
          <Link to={"/library"}>LIBRARY</Link>
          <Link to={"/recommendation"}>PROFILE</Link>
        </nav>
      </section>
      <section className="header-auth">
        <span>{session?.user.email?.split("@")[0]}</span>
        <button className="logout-btn" onClick={handleLogout}>
          LOG OUT
        </button>
      </section>
    </header>
  );
}
