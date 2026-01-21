import { Link, useNavigate } from "react-router";
import "./header.css";
import { createClient, type Session } from "@supabase/supabase-js";
import { useContext } from "react";
import { sessionContext } from "../utils/SessionProvider";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string,
);

export default function Header() {
  const navigate = useNavigate();
  const session: Session | null = useContext(sessionContext);
  const userEmail = session?.user?.email?.split("@")[0] ?? "Guest";

  const handleLogout = async (): Promise<void> => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

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
        <span>{userEmail}</span>
        <button className="logout-btn" onClick={handleLogout}>
          LOG OUT
        </button>
      </section>
    </header>
  );
}
