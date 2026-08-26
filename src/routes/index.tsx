import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import type { JwtPayload } from "@supabase/supabase-js";
import Header from "../components/Header";

export const Route = createFileRoute('/')({
    component: Index,
})

function Index():React.ReactNode {
    const [claims, setClaims] = useState<JwtPayload | null>(null)

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

    // If user is logged in, show welcome screen
    if (claims) {
	return (
	    <>
	    <Header />
	    <div>
	    <h1>Welcome!</h1>
	    <p>You are logged in as: {claims.email}</p>
	    </div>
	    </>
	)
    }
    return (
	<>
	<Header />
	<div>
	<p>Hello World</p>
	</div>
	</>
    )
}
