import "./contentCard.css";
import starImg from "../assets/star.png";
import rankImg from "../assets/leaderboard.png";
import userStarImg from "../assets/sparkle.png";
import { Link } from "react-router";
import supabase from "../utils/supabase";
import { useContext } from "react";
import { sessionContext } from "../utils/SessionProvider";

interface CardProp {
  name: string;
  id: number;
  rating: number;
  ranking: number;
  image: string;
  genre: string[];
  user_item: boolean;
  index?: number;
  episodes: number;
}

export default function ContentCard(cardProp: CardProp) {
  const userId: string | undefined = useContext(sessionContext)?.user?.id;

  const listToString = (arr: String[]) => {
    // since genre is a list convert it to a string and join with ,
    return arr.join(", ");
  };

  const addToLibrary = async () => {
    const { data, error } = await supabase.from("user_library").insert([
      {
        user_id: userId,
        mal_id: cardProp.id,
        title: cardProp.name,
        thumbnail: cardProp.image,
        rating: 0,
        curr_episode: 0,
        episodes: cardProp.episodes,
      },
    ]);
    if (error) {
      alert("anime already in library!");
      console.log(error);
    } else {
      alert("anime added to library!");
      console.log(data);
    }
  };

  return (
    <div className="card" key={cardProp.index}>
      <div className="card-hover">
        <div className="sec-button">
          <Link className="link-button" to={`/${cardProp.id}`}>
            Read More
          </Link>
        </div>
        <button onClick={() => addToLibrary()}>Add to Library</button>
      </div>
      <div className="img-cont">
        <img src={cardProp.image} alt="" />
      </div>
      <div className="metadata">
        <span className="title"> {cardProp.name} </span>
        <span className="genre">
          {cardProp.genre ? listToString(cardProp.genre) : "none"}
        </span>
        <div className="popularity-cont">
          <div className="popularity-data-cont">
            <div className="upper-sect">
              <img src={starImg} alt="star" />
              {cardProp.rating ? (
                <span className="num-data">{cardProp.rating}</span>
              ) : (
                <span className="num-data">N/A</span>
              )}
            </div>
            <div className="lower-sect">
              <span className="num-lbl">Rating</span>
            </div>
          </div>
          <div className="popularity-data-cont">
            <div className="upper-sect">
              <img src={rankImg} alt="rank" />
              {cardProp.ranking ? (
                <span className="num-data">#{cardProp.ranking}</span>
              ) : (
                <span className="num-data">N/A</span>
              )}
            </div>
            <div className="lower-sect">
              <span className="num-lbl">Ranking</span>
            </div>
          </div>
          {cardProp.user_item ? (
            <div className="popularity-data-cont">
              <div className="upper-sect">
                <img src={userStarImg} alt="star" />
                <span className="num-data">unrated</span>
              </div>
              <div className="lower-sect">
                <span className="num-lbl">Your Score</span>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
