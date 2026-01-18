import "./libraryCard.css";
import linkImg from "../assets/external-link.png";
import { useState } from "react";

interface CardProp {
  name: string;
  id: number;
  userRating: number;
  image: string;
  index?: number;
  episodes: number;
  currEpisode: number;
}

export default function LibraryCard(cardProp: CardProp) {
  const [episode, setEpisode] = useState<number>(cardProp.currEpisode);
  const [rating, setRating] = useState<number>(cardProp.userRating);

  return (
    <div className="library-card glow">
      <div className="library-card-img-cont">
        <img src={cardProp.image} alt="" />
      </div>
      <div className="library-card-info-cont">
        <div
          className="library-card-title"
          onClick={() => (window.location.href = `/shows/${cardProp.id}`)}
        >
          <div className="library-card-title-left">
            <p className="card-title">{cardProp.name}</p>
            <img src={linkImg} alt="" />
          </div>
        </div>
        <div className="library-card-rating-cont">
          <div className="library-update-element-cont">
            <input type="number" min={0} max={10} />
          </div>
          <p className="user-rating">
            Your Rating: {cardProp.userRating ?? "Unrated"}
          </p>
          <button className="library-button">update rating</button>
        </div>
        <div className="library-card-episode-cont">
          <p>
            Episodes: {cardProp.currEpisode ?? 0} /{" "}
            {cardProp.episodes ?? "Null"}
          </p>
          <button className="library-button">update episodes</button>
        </div>
      </div>
    </div>
  );
}
