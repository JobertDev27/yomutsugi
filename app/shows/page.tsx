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
    <div>
      {shows?.map((show, i) => (
        <ShowCard {...show} key={i} />
      ))}
    </div>
  );
}
