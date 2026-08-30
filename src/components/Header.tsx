import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { JwtPayload } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase"

export default function Header() {
    const [claims, setClaims] = useState<JwtPayload | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
	supabase.auth.getClaims().then(({ data }) => {
	    setClaims(data?.claims ?? null)
	});

	const {
	    data: { subscription },
	} = supabase.auth.onAuthStateChange(() => {
	    supabase.auth.getClaims().then(({ data }) => {
		setClaims(data?.claims ?? null);
	    });
	});

	return () => subscription.unsubscribe();
    }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setClaims(null)
    navigate({to: "/"})
  }

    return <header className="flex flex-row w-full justify-between p-5" >

    <div  > <h1>Yomutsugi</h1> </div>
    <form>
    <input type="search" placeholder="search"/>	
    </form> 
    <nav className="flex flex-row gap-5">
	<Link to='/'>Library</Link>
	<Link to='/animes'>Browse</Link>
	{claims ? <button onClick={handleLogout}>Logout</button> : <Link to="/auth">Login</Link> }
    </nav>
    </header>
}
