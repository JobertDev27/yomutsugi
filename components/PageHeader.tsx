"use client";

import { useRouter } from "next/navigation";

export default function PageHeader() {
  const router = useRouter();
  return (
    <header className="w-full flex justify-between p-5 box-border">
      <div>
        <h1>Yomutsugi</h1>
      </div>
      <form action={"/shows"}>
        <input type="search" name="q" placeholder="search..." />
        <button type="submit">search</button>
      </form>
      <nav>
        <p>Login</p>
      </nav>
    </header>
  );
}
