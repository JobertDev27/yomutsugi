"use client";

import { useEffect, useState } from "react";
import { getAllAnime } from "@/api/anime";
import ShowCard from "@/components/ShowCard";
import { Show } from "@/type/types";
import PageHeader from "@/components/PageHeader";

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
    <>
      <PageHeader />
      <main>
        <section className="grid lg:grid-cols-8 md:grid-cols-6 grid-cols-4 gap-4 p-4">
          {shows?.map((show, i) => (
            <ShowCard {...show} key={i} />
          ))}
        </section>
      </main>
    </>
  );
}
