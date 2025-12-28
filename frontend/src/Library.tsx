import Header from "./components/Header";
import { get_anime_by_id } from "./utils/api";
import { useState, useEffect } from "react";
import ContentCard from "./components/ContentCard";
import LibraryTab from "./components/LibraryTab";

interface CardProp {
  name: string;
  rating: number;
  ranking: number;
  image: string;
  genre: string[];
  user_item: boolean;
}

export default function Library() {
  const [animeList, setAnimeList] = useState<CardProp | null>(null);

  useEffect(() => {
    const fetch_data = async () => {
      const res = await get_anime_by_id("27");
      console.log(res.data.title);
      setAnimeList({
        // added fallback measures to make sure that the content loads even with
        // incomplete json data to avoid the content not loading entirely
        name: res?.data?.title_english ?? res?.data?.title,
        rating: res?.data?.score,
        ranking: res?.data?.rank,
        image: res?.data?.images?.webp?.image_url,
        user_item: true,
        genre: [
          // merge the 3 genre dicts that jinka sends and get only the name
          // because for some reason they needed different dicts for genre
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
