export default function PageHeader() {
  return (
    <header className="w-full flex justify-between p-5 box-border">
      <div>
        <h1>Yomutsugi</h1>
      </div>
      <div>
        <search></search>
      </div>
      <nav>
        <p>Login</p>
      </nav>
    </header>
  );
}
