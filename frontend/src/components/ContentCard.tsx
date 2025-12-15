import "./contentCard.css";
import starImg from "../assets/star.png";
import rankImg from "../assets/leaderboard.png";

interface CardProp {
  name: string;
  rating: number;
  ranking: number;
  image: string;
  genre: string[];
}

export default function ContentCard(cardProp: CardProp) {
  const listToString = (arr: String[]) => {
    return arr.join(", ");
  };
  return (
    <div>
      <div className="img-cont"></div>
      <div className="metadata">
        <span className="title"> {cardProp.name} </span>
        <span className="genre">{listToString(cardProp.genre)}</span>
        <div className="popularity-cont">
          <div className="rating">
            <div className="upper-sect">
              <img src={starImg} alt="star" />
              <span className="num-data"></span>
            </div>
            <div className="lower-sect">
              <span className="num-lbl"></span>
            </div>
          </div>
          <div className="ranking">
            <div className="upper-sect">
              <img src={rankImg} alt="rank" />
              <span className="num-data"></span>
            </div>
            <div className="lower-sect">
              <span className="num-lbl"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
