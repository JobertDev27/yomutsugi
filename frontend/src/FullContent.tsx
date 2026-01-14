import { useParams } from "react-router";
import "./fullContent.css";
import { useEffect, useState } from "react";
import { get_anime_by_id } from "./utils/api";

interface contentProp {
  title: string;
  synopsis: string;
  rank: number;
  score: number;
  classification: string;
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
      <h1>{data?.title}</h1>
      <p>{data?.synopsis}</p>
      <p>{data?.episodes}</p>
      <img src={data?.img} alt="cover image" />
      <p>{data?.rank}</p>
      <p>{data?.classification}</p>
      <p>{data?.score}</p>
      <p>{data?.type}</p>
      <p>{data?.status}</p>
      <p>{data?.schedule}</p>
      <p>{data?.aired}</p>
      <p>{data?.episodes}</p>
      <p>{data?.duration}</p>
      <p>
        {data?.season} {data?.year}
      </p>
      <p>{data?.genre.join(", ")}</p>
    </>
  );
}
