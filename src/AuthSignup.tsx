import { useState } from "react";
import supabase from "./utils/supabase";
import { Link } from "react-router";

export default function AuthSignup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");

  async function signUpNewUser(e: React.FormEvent) {
    e.preventDefault();
    if (password != passwordConf) {
      alert("Password doesn't match!");
      return;
    }
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "/library",
      },
    });

    if (error) {
      alert(error);
    } else {
      alert("We sent you an email! Please confirm");
    }
  }

  return (
    <main className="auth-cont">
      <form onSubmit={signUpNewUser}>
        <h1>YOMUTSUGI</h1>
        <div className="input-cont">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            required
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-cont">
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-cont">
          <label htmlFor="pass">Confirm Password</label>
          <input
            type="password"
            required
            name="password-conf"
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
        <Link className="link" to={"/"}>
          Already have an account? log in
        </Link>
      </form>
    </main>
  );
}
