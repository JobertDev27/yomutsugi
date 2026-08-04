"use client";

import ShowCard from "@/components/ShowCard";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { getAllAnime } from "@/api/anime";
import { Show } from "@/type/types";

export default function Shows() {
  const [shows, setShows] = useState<Show[]>([]);

  const search = useSearchParams();
  console.log(search);

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
        <p>{search.get("q")}</p>
        <section className="grid lg:grid-cols-8 md:grid-cols-6 grid-cols-4 gap-4 p-4">
          {shows?.map((show, i) => (
            <ShowCard {...show} key={i} />
          ))}
        </section>
      </main>
    </>
  );
}
