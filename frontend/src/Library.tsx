import Header from "./components/Header";
import { useState, useEffect, useContext } from "react";
import LibraryCard from "./components/LibraryCard";
import { createClient } from "@supabase/supabase-js";
import "./library.css";
import { sessionContext } from "./utils/SessionProvider";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string,
);

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
      <main>
        <section className="library-shows">
          {animeList?.map((data) => {
            return (
              <LibraryCard {...data} name={data.title} image={data.thumbnail} />
            );
          })}
        </section>
      </main>
    </>
  );
}
