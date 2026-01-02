import { useEffect, useState } from "react";
import { get_anime } from "./utils/api";
import ContentCard from "./components/ContentCard";

interface CardProp {
  name: string;
  rating: number;
  ranking: number;
  image: string;
  genre: string[];
  user_item: boolean;
}

export default function Shows() {
  const [shows, setShows] = useState<CardProp[] | null>(null);

  useEffect(() => {
    const fetch_shows = async () => {
      const res = await get_anime();
      // data.data.map((res: any) => {
      //   const curr_show: CardProp = {
      //     name: res?.title_english ?? res?.title,
      //     rating: res?.score,
      //     ranking: res?.rank,
      //     image: res?.images?.webp?.image_url,
      //     user_item: true,
      //     genre: [
      //       // merge the 3 genre dicts that jinka sends and get only the name
      //       // because for soreason they needed different dicts for genre
      //       ...(res.genres ?? []),
      //       ...(res.themes ?? []),
      //       ...(res.demographics ?? []),
      //     ].map((d) => d.name),
      //   };
      //   setShows([...(shows ?? []), curr_show]);
      // });
      const shows_data: CardProp[] = res.data.map((d: any) => ({
        name: d?.title_english ?? d?.title,
        rating: d?.score,
        ranking: d?.rank,
        image: d?.images?.webp?.image_url,
        user_item: true,
        genre: [
          // merge the 3 genre dicts that jinka sends and get only the name
          // because for soreason they needed different dicts for genre
          ...(d.genres ?? []),
          ...(d.themes ?? []),
          ...(d.demographics ?? []),
        ].map((f) => f.name),
      }));
      setShows(shows_data);
    };
    fetch_shows();
  }, []);
  console.log(shows);
  return (
    <>
      <main>
        {shows?.map((c) => {
          console.log(c);
          return (
            <ContentCard
              name={c.name}
              ranking={c.ranking}
              rating={c.rating}
              image={c.image}
              genre={c.genre}
              user_item={false}
            />
          );
        })}
      </main>
    </>
  );
}
