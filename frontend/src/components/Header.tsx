import { Link, useNavigate } from "react-router";
import "./header.css";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string
);

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <header>
      <section className="header-nav">
        <nav>
          <Link to={"/show"}>SHOWS</Link>
          <Link to={"/library"}>LIBRARY</Link>
          <Link to={"/recommendation"}>RECOMMENDATION</Link>
        </nav>
      </section>
      <section className="header-title">
        <h1>YOMUTSUGI</h1>
      </section>
      <section className="header-auth">
        <button className="logout-btn" onClick={handleLogout}>
          LOG OUT
        </button>
      </section>
    </header>
  );
}
