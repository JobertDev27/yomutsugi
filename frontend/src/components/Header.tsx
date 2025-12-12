import { Link } from "react-router";
import "./header.css";

export default function Header() {
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
        <button
          className="logout-btn"
          // Handle user log out. Temp fix, TODO: add proper cookie and auth
          onClick={() => {
            console.log("logged out");
            window.location.href = "/";
          }}
        >
          LOG OUT
        </button>
      </section>
    </header>
  );
}
