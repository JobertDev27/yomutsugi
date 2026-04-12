import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import "./styles/header.css";
import supabase from "../utils/supabase";
import { sessionContext } from "../utils/SessionProvider";

export default function Header() {
  const navigate = useNavigate();
  const userId = useContext(sessionContext)?.user?.id;

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
          <Link to={"/"}>EXPLORE</Link>
          <Link to={"/library"}>LIBRARY</Link>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          {userId ? "LOG OUT" : "SIGN IN"}
        </button>
      </section>
    </header>
  );
}
