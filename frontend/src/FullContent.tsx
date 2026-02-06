import { useParams } from "react-router";
import "./fullContent.css";
import { useEffect, useState } from "react";
import { get_anime_by_id } from "./utils/api";
import Header from "./components/Header";

interface contentProp {
  title: string;
  synopsis: string;
  rank: number;
  score: number;
  rating: string;
  genre: string[];
  schedule: string;
  type: string;
  studio: string;
  status: string;
  aired: string;
  duration: string;
  episodes: string;
  img: string;
  season: string;
  year: string;
}

export default function FullContent() {
  const [data, setData] = useState<contentProp | null>();
  let param = useParams();

  useEffect(() => {
    const getData = async () => {
      const res = await get_anime_by_id(param.malId!);
      console.log(res);
      setData({
        ...res.data,
        img: res.data.images.webp.large_image_url,
        schedule: res.data.broadcast.string,
        aired: res.data.aired.string,
        genre: [
          // merge the 3 genre dicts that jinka sends and get only the name
          // because for some reason they needed different dicts for genre
          ...(res.data.genres ?? []),
          ...(res.data.themes ?? []),
          ...(res.data.demographics ?? []),
        ].map((f) => f.name),
      });
    };
    getData();
  }, []);

  return (
    <>
      <Header />
      <main className="content-main">
        <section className="content-section">
          <img src={data?.img} alt="cover image" />
          <button>ADD TO LIBRARY</button>
        </section>
        <section className="content-section-metadata">
          <div className="content-seperator">
            <h1>{data?.title}</h1>
          </div>
          <div className="content-seperator">
            {" "}
            <p>{data?.synopsis}</p>
          </div>
          <div className="content-seperator">
            <p>Ranking: {data?.rank}</p>
            <p>Rating: {data?.score}</p>
            <p>Genre: {data?.genre.join(", ")}</p>
            <p>Classification: {data?.rating}</p>
          </div>
          <p>Episodes: {data?.episodes}</p>
          <p>Duration: {data?.duration}</p>
          <p>Date Aired: {data?.aired}</p>
          {data?.schedule && <p>Release Schedule: {data?.schedule}</p>}
          <p>Show Type: {data?.type}</p>
          <p>Studio: {data?.studio}</p>
          <p>Status: {data?.status}</p>
          <p>
            Season Aired: {data?.season} {data?.year}
          </p>
        </section>
      </main>
    </>
  );
}
