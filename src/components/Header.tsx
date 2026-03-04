import { Link, useNavigate } from "react-router";
import "./styles/header.css";
import supabase from "../utils/supabase";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <header>
      <section className="header-title">
        <h1>YOMUTSUGI</h1>
      </section>
      <section className="header-auth">
        <nav className="header-nav">
          <Link to={"/shows"}>EXPLORE</Link>
          <Link to={"/library"}>LIBRARY</Link>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          LOG OUT
        </button>
      </section>
    </header>
  );
}
