"use client";

import Link from "next/link";

export default function PageHeader() {
  return (
    <header className="w-full flex justify-between p-5 box-border">
      <div>
        <h1>Yomutsugi</h1>
      </div>
      <form action={"/shows"}>
        <input type="search" name="q" placeholder="search..." />
        <button type="submit">search</button>
      </form>
      <div className="flex justify-between lg:gap-20">
        <nav className="flex gap-4">
          <Link href="/shows">Shows</Link>
          <Link href="/">Library</Link>
        </nav>
        <div>
          <Link href="/auth">Login</Link>
        </div>
      </div>
    </header>
  );
}
