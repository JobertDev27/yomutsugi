import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string
);

export default function AuthSignup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function signUpNewUser() {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "/library",
      },
    });

    if (error) {
      alert(error);
    }
  }

  return (
    <form onSubmit={signUpNewUser}>
      <input
        type="text"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
