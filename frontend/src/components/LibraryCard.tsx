import "./libraryCard.css";
import starImg from "../assets/star.png";

interface CardProp {
  name: string;
  id: number;
  rating: number;
  image: string;
  index?: number;
}

export default function LibraryCard(cardProp: CardProp) {
  return (
    <div className="library-card">
      <div className="library-card-img-cont">
        <img src={cardProp.image} alt="" />
      </div>
      <div className="library-card-info-cont">
        <p className="card-title">{cardProp.name}</p>
        <div className="library-card-rating-cont">
          <img src={starImg} alt="" />
          <p>{cardProp.rating}</p>
        </div>
      </div>
    </div>
  );
}
