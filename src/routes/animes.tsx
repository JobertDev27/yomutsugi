import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import type { Show } from "../types/type";
import { getAllAnime } from "../api/tenrai";
import ShowCard from "../components/ShowCard";

export const Route = createFileRoute('/animes')({
    component: Animes,
})

function Animes():React.ReactNode {
    const [shows, setShows] = useState<Show[]>([])
    
    useEffect(() => {
	const fetchShows = async () => {
	    const temp = await getAllAnime()
	    console.log(temp)
	    setShows(temp)
	}
	fetchShows()

    },[])

    return (
	<>
	<Header />
	<main className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2  gap-2">
	{shows.map((s, key) => <ShowCard show={s} key={key} />)}	    
	</main>	
	</>
    )
}
