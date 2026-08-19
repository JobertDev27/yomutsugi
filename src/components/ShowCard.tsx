import { Link } from "@tanstack/react-router";
import type { Show } from "../types/type";

type ShowProps = {
    show: Show;
}

export default function ShowCard({show}: ShowProps): React.ReactNode {
    return <Link to="/animes/$animeId" params={{animeId: String(show.id)}}>
	<div>
	    <img className="max-h-[250px] w-full  min-h-25" src={show.cover} alt={`${show.title} cover`} />
	    <div>
	    <p>{show.title}</p> 
	    </div>
	</div>
    </Link>


}
