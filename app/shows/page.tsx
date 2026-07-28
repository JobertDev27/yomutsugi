"use client";

import { useEffect, useState } from "react";
import { getAllAnime } from "@/api/anime";
import ShowCard from "@/components/ShowCard";
import { Anime } from "@/type/types";

export default function Shows() {
  const [shows, setShows] = useState<Anime[]>([]);
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const tempShows = await getAllAnime();
        setShows(tempShows?.data);
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
