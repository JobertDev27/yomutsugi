import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
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
  data: any;
  episodes: number;
}

export default function Shows() {
  const [shows, setShows] = useState<CardProp[] | null>(null);

  const [queryParams, setQueryParams] = useSearchParams();

  // Search queries
  const [query, setQuery] = useState<string>("");
  // const [rating, setRating] = useState<string>("");
  // const [ratingMin, setRatingMin] = useState<string>("");
  // const [ratingMax, setRatingMax] = useState<string>("");
  // const [contentClass, setContentClass] = useState<string>("");
  // const [startDate, setStartDate] = useState<string>("");
  // const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    const fetch_shows = async () => {
      const q = queryParams.get("q");
      const res = queryParams.get("q")
        ? await get_anime_by_query(q ?? "")
        : await get_anime();
      const shows_data: CardProp[] = res.data.map((d: any) => ({
        name: d?.title_english ?? d?.title,
        id: d?.mal_id,
        rating: d?.score,
        ranking: d?.rank,
        image: d?.images?.webp?.image_url,
        episodes: d?.episodes,
        genre: [
          // merge the 3 genre dicts that jinka sends and get only the name
          // because for some reason they needed different dicts for genre
          ...(d.genres ?? []),
          ...(d.themes ?? []),
          ...(d.demographics ?? []),
        ].map((f) => f.name),
      }));
      setShows(shows_data);
    };
    fetch_shows();
  }, [queryParams]);
  return (
    <>
      <Header />
      <main className="shows-main">
        <aside>
          <form
            className="search-query"
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              setQueryParams({ q: String(form.get("search")) });
            }}
          >
            <div className="query-cont">
              <label htmlFor="search">Search</label>
              <input
                type="search"
                name="search"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
            </div>
            {/* <div className="rating-cont">
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
            </div> */}
            <button className="search-btn" type="submit">
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
                episodes={c.episodes}
                key={k}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}
