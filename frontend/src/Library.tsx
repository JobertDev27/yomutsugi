import Header from "./components/Header";
import { get_anime_by_id } from "./api";
import { useState, useEffect } from "react";
import ContentCard from "./components/ContentCard";
import LibraryTab from "./components/LibraryTab";

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
      const res = await get_anime_by_id("60303");
      console.log(res.data.title);
      setAnimeList({
        name: res?.data?.title_english ?? res?.data?.title,
        rating: res?.data?.score,
        ranking: res?.data?.rank,
        image: res?.data?.images?.webp?.image_url,
        genre: [
          // merge the 3 genre that jinka sends and get only the name
          ...(res?.data.genres ?? []),
          ...(res?.data.themes ?? []),
          ...(res?.data.demographics ?? []),
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
        <LibraryTab />
        {animeList ? <ContentCard {...animeList} /> : <h1>no records</h1>}
      </main>
    </>
  );
}
