import Header from "./components/Header";
import { useState, useEffect, useContext } from "react";
import LibraryCard from "./components/LibraryCard";
import supabase from "./utils/supabase";
import "./library.css";
import { sessionContext } from "./utils/SessionProvider";

export default function Library() {
  const [animeList, setAnimeList] = useState<any[] | null>(null);
  const userId = useContext(sessionContext)?.user?.id;

  useEffect(() => {
    const fetch_data = async () => {
      const { data, error } = await supabase
        .from("user_library")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.log(error.message);
      } else {
        setAnimeList(data);
      }
    };
    fetch_data();
  }, []);
  console.log(animeList);
  return (
    <>
      <Header />
      <main className="library">
        <section className="library-shows">
          {animeList?.map((data) => {
            return (
              <LibraryCard
                {...data}
                name={data.title}
                image={data.thumbnail}
                id={data.mal_id}
                key={data.mal_id}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}
