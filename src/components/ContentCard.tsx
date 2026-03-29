import "./styles/contentCard.css";
import { useNavigate } from "react-router";
import { type CardProp } from "../utils/types";

export default function ContentCard(cardProp: CardProp) {
  const navigate = useNavigate();

  return (
    <div className="lib-card-cont" onClick={() => navigate(`/${cardProp.id}`)}>
      <img src={cardProp.image} alt="" />
      <div className="card-rank">
        <p>#{cardProp.ranking}</p>
      </div>
      <div className="card-score">
        <div className="">
          <p>&#128970;{cardProp.rating}</p>
        </div>
      </div>
      <div className="lib-card-info">
        <p className="lib-card-title">{cardProp.name}</p>
      </div>
    </div>
  );
}
