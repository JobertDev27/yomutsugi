import "./contentCard.css";
import starImg from "../assets/star.png";
import rankImg from "../assets/leaderboard.png";
import userStarImg from "../assets/sparkle.png";

interface CardProp {
  name: string;
  rating: number;
  ranking: number;
  image: string;
  genre: string[];
  user_item: boolean;
}

export default function ContentCard(cardProp: CardProp) {
  const listToString = (arr: String[]) => {
    // since genre is a list convert it to a string
    return arr.join(", ");
  };
  return (
    <div className="card">
      <div className="card-hover">
        <button className="sec-btn">Read More</button>
        <button>Add to Library</button>
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
              <span className="num-data">{cardProp.rating}</span>
            </div>
            <div className="lower-sect">
              <span className="num-lbl">Rating</span>
            </div>
          </div>
          <div className="popularity-data-cont">
            <div className="upper-sect">
              <img src={rankImg} alt="rank" />
              <span className="num-data">#{cardProp.ranking}</span>
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
