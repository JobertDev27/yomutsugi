import type { ShowProps } from "../types/type";

export default function ShowCard(show: ShowProps): React.ReactNode {
    return <div>
	<img src={show.cover} alt={`${show.title} cover`} />
	<div>
	   <p>{show.title}</p> 
	</div>
    </div>
}
