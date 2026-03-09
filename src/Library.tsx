import Header from "./components/Header";
import { useState, useEffect, useContext } from "react";
// import ShowCard from "./components/ShowCard";
import supabase from "./utils/supabase";
import "./styles/library.css";
import { sessionContext } from "./utils/SessionProvider";

export default function Library() {
  const [animeList, setAnimeList] = useState<any[] | null>(null);
  const userId = useContext(sessionContext)?.user?.id;

  useEffect(() => {
    if (!userId) return;

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
  }, [userId]);

  console.log(animeList);
  return (
    <>
      <Header />
      <main className="library">
        <section className="library-shows">
          {/* {animeList?.map((data) => {
            return (
              // <ShowCard
              //   {...data}
              //   name={data.title}
              //   image={data.thumbnail}
              //   id={data.mal_id}
              //   key={data.mal_id}
              // />
              <p>Under Construction</p>
            );
          })} */}
        </section>
      </main>
    </>
  );
}
