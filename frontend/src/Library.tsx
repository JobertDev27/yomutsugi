import Header from "./components/Header";
import { get_anime_by_id } from "./utils/api";
import { useState, useEffect, useContext } from "react";
import LibraryCard from "./components/LibraryCard";
import { createClient } from "@supabase/supabase-js";
import "./library.css";
import { sessionContext } from "./utils/SessionProvider";

interface CardProp {
  name: string;
  id: number;
  userRating: number;
  image: string;
  episodes: number;
  currEpisode: number;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string,
);

export default function Library() {
  const [animeList, setAnimeList] = useState<CardProp | null>(null);
  const userId = useContext(sessionContext)?.user?.id;

  useEffect(() => {
    const fetch_data = async () => {
      const res = await get_anime_by_id("27");
      console.log(res.data.title);
      setAnimeList({
        // added fallback measures to make sure that the content loads even with
        // incomplete json data to avoid the content not loading entirely
        name: res?.data?.title_english ?? res?.data?.title,
        id: res?.data?.mal_id,
        userRating: 0,
        image: res?.data?.images?.webp?.image_url,
        episodes: res?.data?.episodes,
        currEpisode: 0,
      });
    };
    fetch_data();
  }, []);
  console.log(animeList);
  return (
    <>
      <Header />
      <main>
        <section className="library-shows">
          {animeList ? <LibraryCard {...animeList} /> : <h1>no records</h1>}
        </section>
      </main>
    </>
  );
}
