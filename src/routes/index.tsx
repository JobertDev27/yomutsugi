import Header from "../components/Header"
import { createFileRoute, Link } from "@tanstack/react-router"
import {Route as Anime } from "./animes"

export const Route = createFileRoute('/')({
    component: Index,
})

function Index () {
    return( 
	   <>
	   <Header />
	   <Link to="Anime">Anime</Link>
	   </>
	  )
}
