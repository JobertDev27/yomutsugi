"use client";

import { getAnimeById } from "@/api/anime";
import { Show } from "@/type/types";
import { useEffect, useState, use } from "react";
import Image from "next/image";

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const [anime, setAnime] = useState<Show>();
  const { id } = use(params);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAnimeById(id);
      setAnime(data);
    };
    fetchData();
  }, [id]);

  return (
    <main>
      <h1>{anime?.title}</h1>
      {anime && (
        <Image
          className="w-[450]"
          width={720}
          height={1080}
          src={anime?.cover}
          alt=""
        />
      )}
    </main>
  );
}
