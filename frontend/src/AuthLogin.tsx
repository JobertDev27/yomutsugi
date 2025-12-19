import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router";
import "./auth.css";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string
);

export default function AuthLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for the login link!");
    }
  };

  return (
    <div>
      <h1>Supabase + React</h1>
      <p>Sign in via magic link with your email below</p>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          value={password}
          placeholder="Your password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>SUBMIT</button>
      </form>
    </div>
  );
}
