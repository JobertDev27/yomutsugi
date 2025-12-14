import Header from "./components/Header";
import { get_anime_by_id } from "./api";
import { useState, useEffect } from "react";

export default function Library() {
  const [animeList, setAnimeList] = useState();

  useEffect(() => {
    const fetch_data = async () => {
      const data = await get_anime_by_id("62653");
      return setAnimeList(data);
    };
    fetch_data();
  }, []);

  console.log(animeList);
  return (
    <>
      <Header />
      <main></main>
    </>
  );
}
