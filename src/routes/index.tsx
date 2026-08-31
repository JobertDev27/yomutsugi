import { createFileRoute } from "@tanstack/react-router";
import type { JwtPayload } from "@supabase/supabase-js";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";

export const Route = createFileRoute('/')({
    component: Index,
})

function Index():React.ReactNode {
    const claims : JwtPayload | null = useAuth()

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
