import Header from "../components/Header"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute('/')({
    component: Index,
})

function Index () {
    return( 
	   <>
	   <Header />
	   <Link to="/animes">Anime</Link>
	   </>
	  )
}
