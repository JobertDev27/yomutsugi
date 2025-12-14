import "./contentCard.css";

interface CardProp {
  name: String;
  rating: Number;
  ranking: Number;
  image: String;
  genre: String[];
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
              <img src="" alt="" />
              <span className="num-data"></span>
            </div>
            <div className="lower-sect">
              <span className="num-lbl"></span>
            </div>
          </div>
          <div className="ranking">
            <div className="upper-sect">
              <img src="" alt="" />
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
