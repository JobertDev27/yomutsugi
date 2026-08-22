import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import type { JwtPayload } from "@supabase/supabase-js";

export const Route = createFileRoute('/animes/')({
    component: Animes,
})

function Animes():React.ReactNode {
    const [claims, setClaims] = useState<JwtPayload | null>(null)
    //const [shows, setShows] = useState<Show[]>([])

    useEffect(() => {
	const params = new URLSearchParams(window.location.search);
	const token_hash = params.get("token_hash");
	const type = params.get("type");

	if (token_hash) {
	    supabase.auth.verifyOtp({
		token_hash,
		type: type || "email",
	    });
	}

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

    // If user is logged in, show welcome screen
    if (claims) {
	return (
	    <div>
	    <h1>Welcome!</h1>
	    <p>You are logged in as: {claims.email}</p>
	    </div>
	)
    }
    // Show login form
    return (
	<div>
	<p>Hello World</p>
	</div>
    )
}
