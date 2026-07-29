"use client";

import { useEffect, useState } from "react";
import { getAllAnime } from "@/api/anime";
import ShowCard from "@/components/ShowCard";
import { Show } from "@/type/types";

export default function Shows() {
  const [shows, setShows] = useState<Show[]>([]);
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const tempShows = await getAllAnime();
        setShows(tempShows);
        console.log("successful:", tempShows);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShows();
  }, []);
  return (
    <main>
      <section className="grid grid-cols-8 gap-4 p-4">
        {shows?.map((show, i) => (
          <ShowCard {...show} key={i} />
        ))}
      </section>
    </main>
  );
}
