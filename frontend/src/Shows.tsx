import { useEffect, useState } from "react";
import { get_anime, get_anime_by_query } from "./utils/api";
import ContentCard from "./components/ContentCard";
import Header from "./components/Header";
import "./shows.css";

interface CardProp {
  name: string;
  rating: number;
  ranking: number;
  image: string;
  genre: string[];
  user_item: boolean;
  data: any;
}

export default function Shows() {
  const [shows, setShows] = useState<CardProp[] | null>(null);
  const [api, setApi] = useState<any | null>(null);

  // Search queries
  const [query, setQuery] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [ratingMin, setRatingMin] = useState<string>("");
  const [ratingMax, setRatingMax] = useState<string>("");
  const [contentClass, setContentClass] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    const fetch_shows = async () => {
      let local_api;
      if (api) {
        local_api = api;
      } else {
        local_api = await get_anime();
      }
      const shows_data: CardProp[] = local_api.data.map((d: any) => ({
        name: d?.title_english ?? d?.title,
        rating: d?.score,
        ranking: d?.rank,
        image: d?.images?.webp?.image_url,
        user_item: true,
        genre: [
          // merge the 3 genre dicts that jinka sends and get only the name
          // because for some reason they needed different dicts for genre
          ...(d.genres ?? []),
          ...(d.themes ?? []),
          ...(d.demographics ?? []),
        ].map((f) => f.name),
      }));
      setShows(null);
      setShows(shows_data);
    };
    fetch_shows();
    console.log(query);
  }, [api]);
  return (
    <>
      <Header />

      <main className="shows-main">
        <aside>
          <form>
            <label htmlFor="search">Search</label>
            <input
              type="text"
              name="search"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                setApi(await get_anime_by_query(query));
              }}
            >
              SEARCH
            </button>
          </form>
        </aside>
        <section className="shows-section">
          {shows?.map((c) => {
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
        </section>
      </main>
    </>
  );
}
