import Header from "./components/Header";
import { get_anime_by_id } from "./api";
import { useState, useEffect } from "react";
import ContentCard from "./components/ContentCard";

interface CardProp {
  name: string;
  rating: number;
  ranking: number;
  image: string;
  genre: string[];
}

export default function Library() {
  const [animeList, setAnimeList] = useState<CardProp | null>(null);

  useEffect(() => {
    const fetch_data = async () => {
      const data = await get_anime_by_id("62653");
      setAnimeList({
        name: data?.title_english,
        rating: data?.score,
        ranking: data?.rank,
        image: data?.images?.webp?.image.url,
        genre: [
          // merge the 3 genre that jinka sends and get only the name
          data.genres ?? [],
          data.themes ?? [],
          data.demographic ?? [],
        ].map((d) => d.name),
      });
    };
    fetch_data();
  }, []);

  console.log(animeList);
  return (
    <>
      <Header />
      <main>
        {animeList ? <ContentCard {...animeList} /> : <h1>no records</h1>}
      </main>
    </>
  );
}
