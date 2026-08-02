"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

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
      <nav className="flex gap-4">
        <p>Login</p>
        <Link href="/shows">Shows</Link>
      </nav>
    </header>
  );
}
