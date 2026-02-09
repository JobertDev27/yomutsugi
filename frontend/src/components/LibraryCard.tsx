import { useNavigate } from "react-router";
import "./libraryCard.css";

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
  const navigate = useNavigate();

  return (
    <div className="lib-card-cont" onClick={() => navigate(`/${cardProp.id}`)}>
      <img src={cardProp.image} alt="" />
      <div className="lib-card-info">
        <p className="lib-card-title">{cardProp.name}</p>
      </div>
    </div>
  );
}
