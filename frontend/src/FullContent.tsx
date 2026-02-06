import { useParams } from "react-router";
import "./fullContent.css";
import { useEffect, useState, useContext } from "react";
import { get_anime_by_id } from "./utils/api";
import Header from "./components/Header";
import { sessionContext } from "./utils/SessionProvider";
import supabase from "./utils/supabase";

interface contentProp {
  title: string;
  mal_id: string;
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
  const [apiData, setApiData] = useState<contentProp | null>();
  const [isListed, setIsListed] = useState<boolean>(false);

  const userId = useContext(sessionContext)?.user?.id;

  let param = useParams();

  useEffect(() => {
    const getData = async () => {
      const res = await get_anime_by_id(param.malId!);
      console.log(res);
      setApiData({
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

  useEffect(() => {
    if (!userId || !apiData) return;
    const checkInLibrary = async () => {
      const { data, error } = await supabase
        .from("user_library")
        .select("*")
        .eq("user_id", userId)
        .eq("mal_id", apiData?.mal_id);
      if (error) {
        console.log(error);
      } else {
        console.log("passed: " + JSON.stringify(data));
        setIsListed(true);
      }
    };
    checkInLibrary();
  }, [userId, apiData]);

  return (
    <>
      <Header />
      <main className="content-main">
        <section className="content-section">
          <img src={apiData?.img} alt="cover image" />
          {isListed ? (
            <button>REMOVE FROM LIBRARY</button>
          ) : (
            <button>ADD TO LIBRARY</button>
          )}
        </section>
        <section className="content-section-metadata">
          <div className="content-seperator">
            <h1>{apiData?.title}</h1>
          </div>
          <div className="content-seperator">
            {" "}
            <p>{apiData?.synopsis}</p>
          </div>
          <div className="content-seperator">
            <p>Ranking: {apiData?.rank}</p>
            <p>Rating: {apiData?.score}</p>
            <p>Genre: {apiData?.genre.join(", ")}</p>
            <p>Classification: {apiData?.rating}</p>
          </div>
          <p>Episodes: {apiData?.episodes}</p>
          <p>Duration: {apiData?.duration}</p>
          <p>Date Aired: {apiData?.aired}</p>
          {apiData?.schedule && <p>Release Schedule: {apiData?.schedule}</p>}
          <p>Show Type: {apiData?.type}</p>
          <p>Studio: {apiData?.studio}</p>
          <p>Status: {apiData?.status}</p>
          <p>
            Season Aired: {apiData?.season} {apiData?.year}
          </p>
        </section>
      </main>
    </>
  );
}
