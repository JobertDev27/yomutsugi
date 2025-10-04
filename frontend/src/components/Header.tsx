export default function Header() {
  return (
    <header>
      <div id="header-title-cont">
        <h1>Yomutsugi</h1>
        <nav className="header-nav">
          <button className="search-btn">
            <img src="../public/search.png" alt="" />
          </button>
          <a href="">LIBRARY</a>
          <a href="">TIER LIST</a>
          <button className="important-btn">SIGN OUT</button>
        </nav>
      </div>
    </header>
  );
}
