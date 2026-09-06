import { createFileRoute } from '@tanstack/react-router'
import { getAnimeById } from '../api/tenrai'
import type { Show } from '../types/type'
import {useEffect, useRef, useState} from "react"

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

    const textRef = useRef<HTMLParagraphElement>(null)
    const [expanded, setExpanded] = useState(false)
    const [isOverflowing, setIsOverflowing] = useState(false)

    useEffect(() => {
	const el = textRef.current
	if (!el) return

	    setIsOverflowing(el.scrollHeight > el.clientHeight)
    }, [])

    return <main className='flex flex-col flex-1 justify-center items-center pt-10 mt-10'>
    <section className='flex flex-col justify-center items-center border-border border-2 max-w-[1000px] p-5 mt-10! gap-2'>
    <img src={anime.cover} className='max-h-100' />
    <div className='w-full'>
    <h1 className='font-bold text-xl'>{anime.title}</h1>
    </div>
    <p>{anime.ep}</p>
    <div>
    <p
    ref={textRef}
    className={expanded ? "" : "max-h-24 overflow-hidden"}
    >
    {anime.desc}
    </p>

    {isOverflowing && (
	<button className='text-blue-200! cursor-pointer' onClick={() => setExpanded(prev => !prev)}>
	{expanded ? "Read less" : "Read more"}
	</button>
    )}
    </div>
    <p>{anime.status}</p>
    <p>{anime.aired}</p>
    <p>{anime.rank}</p>
    <p>{anime.rating}</p>
    <p>{anime.duration}</p>
    <p>{anime.year}</p>
    <p>{anime.score}</p>
    </section>
    </main>

}
