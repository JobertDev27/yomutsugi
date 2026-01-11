import { useEffect, useState } from "react";
import { get_anime, get_anime_by_query } from "./utils/api";
import ContentCard from "./components/ContentCard";
import Header from "./components/Header";
import "./shows.css";

interface CardProp {
  name: string;
  id: number;
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
        id: d?.mal_id,
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
          <form className="search-query">
            <div className="query-cont">
              <label htmlFor="search">Search</label>
              <input
                type="search"
                name="search"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
            </div>
            <div className="rating-cont">
              <div className="rating-sub-cont">
                <label htmlFor="rating">Rating</label>
                <input type="text" name="rating" />
              </div>
              <div className="rating-sub-cont">
                <label htmlFor="rating-min">Min</label>
                <input type="text" name="rating-min" />
              </div>
              <div className="rating-sub-cont">
                <label htmlFor="rating-max">Max</label>
                <input type="text" name="rating-max" />
              </div>
            </div>
            <div className="query-cont">
              <label htmlFor="">Content Classification</label>
              <input type="text" />
            </div>
            <div className="query-cont">
              <label htmlFor="">Start Date</label>
              <input type="text" />
            </div>
            <div className="query-cont">
              <label htmlFor="">End Date</label>
              <input type="text" />
            </div>
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
          {shows?.map((c, k) => {
            return (
              <ContentCard
                name={c.name}
                id={c.id}
                ranking={c.ranking}
                rating={c.rating}
                image={c.image}
                genre={c.genre}
                user_item={false}
                key={k}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}
