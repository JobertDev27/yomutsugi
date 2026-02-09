import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import "./auth.css";
import { sessionContext } from "./utils/SessionProvider";
import supabase from "./utils/supabase";

export default function AuthLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const session = useContext(sessionContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(session);
    if (session) {
      navigate("/library");
    }
  }, [session]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
    } else {
      navigate("/library");
    }
  };

  return (
    <main className="auth-cont">
      <form onSubmit={handleLogin}>
        <h1>YOMUTSUGI</h1>
        <div className="input-cont">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-cont">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            placeholder="Your password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link className="link" to="/">
          Forgot Password?
        </Link>
        <button type="submit">Submit</button>
        <Link className="link" to={"/signup"}>
          Don't have an account? register
        </Link>
      </form>
    </main>
  );
}
