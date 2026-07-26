"use client";

import { useEffect, useState } from "react";
import { getAllAnime } from "@/api/anime";
import { Show } from "@/type/types";

export default function Shows() {
  const [shows, setShows] = useState<Show[]>();
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
        <p key={i}>{show.title}</p>
      ))}
    </div>
  );
}
