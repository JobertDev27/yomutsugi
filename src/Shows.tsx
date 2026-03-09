import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getAnime, getAnimeBanner, getAnimeByQuery } from "./utils/api";
import ShowCard from "./components/ShowCard";
import Header from "./components/Header";
import "./styles/shows.css";
import BannerCarousel from "./components/BannerCarousel";

import { type CardProp } from "./utils/types";

export default function Shows() {
  const [shows, setShows] = useState<CardProp[] | null>(null);
  const [bannerShows, setBannerShows] = useState<CardProp[]>([]);

  const [queryParams, setQueryParams] = useSearchParams();

  // Search queries
  const [query, setQuery] = useState<string>("");
  // const [rating, setRating] = useState<string>("");
  // const [ratingMin, setRatingMin] = useState<string>("");
  // const [ratingMax, setRatingMax] = useState<string>("");
  // const [contentClass, setContentClass] = useState<string>("");
  // const [startDate, setStartDate] = useState<string>("");
  // const [endDate, setEndDate] = useState<string>("");

  const parseData = (res: any) => {
    const bannerData: CardProp[] = res.data.map((d: any) => ({
      name: d?.title_english ?? d?.title,
      id: d?.mal_id,
      rating: d?.score,
      ranking: d?.rank,
      image: d?.images?.webp?.image_url,
      episodes: d?.episodes,
      synopsis: d?.synopsis,
    }));
    return bannerData;
  };

  useEffect(() => {
    const fetchBanner = async () => {
      const res = await getAnimeBanner();
      setBannerShows(parseData(res));
    };
    fetchBanner();
  }, []);

  useEffect(() => {
    const fetchShows = async () => {
      const q = queryParams.get("q");
      const res = queryParams.get("q")
        ? await getAnimeByQuery(q ?? "")
        : await getAnime();

      setShows(parseData(res));
    };
    fetchShows();
  }, [queryParams]);
  return (
    <>
      <Header />
      <main className="shows-main">
        <div>
          <h2>TOP SHOWS CURRENTLY AIRING</h2>
          <BannerCarousel data={bannerShows} />
        </div>
        <section className="shows-content">
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
                <label htmlFor="season">Season</label>
                <input type="text" />
              </div>
              <div className="query-cont">
                <label htmlFor="year">Year</label>
                <input type="number" />
              </div>
              <button className="search-btn" type="submit">
                SEARCH
              </button>
            </form>
          </aside>
          <div className="shows-section">
            {shows?.map((show, k) => {
              return <ShowCard {...show} key={k} />;
            })}
          </div>
        </section>
      </main>
    </>
  );
}
