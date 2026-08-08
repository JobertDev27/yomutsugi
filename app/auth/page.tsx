"use client";

import { signUp } from "@/utils/auth/authUtils";
import { useState } from "react";

export default function Auth() {
  const [username, setUsername] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  return (
    <main className="flex flex-1 items-center justify-center">
      <section>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button onClick={() => signUp(username, pass)}>submit</button>
      </section>
    </main>
  );
}
