import { createFileRoute } from '@tanstack/react-router'
import { getAnimeById } from '../api/tenrai'
import type { Show } from '../types/type'

export const Route = createFileRoute('/animes/$animeId')({
  loader: async ({ params }) => {
    console.log('LOADER RAN', params.animeId)
    return getAnimeById(params.animeId)
    },
  component: RouteComponent,
})

function RouteComponent() {
    const anime: Show = Route.useLoaderData()
    console.log(anime)
    return <div>
	<img src={anime.cover} />
	<p>{anime.title}</p>
	<p>{anime.ep}</p>
    </div>

}
