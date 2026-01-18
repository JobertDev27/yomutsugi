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
          <p className="card-title">{cardProp.name}</p>
        </div>
        <div className="library-card-rating-cont">
          <p className="user-rating">
            Your Rating: {cardProp.userRating ?? "Unrated"}
          </p>
          <button className="library-button">update rating</button>
        </div>
        <div className="library-card-episode-cont">
          <p>
            Watched Episodes: {cardProp.currEpisode ?? 0} /{" "}
            {cardProp.episodes ?? "Null"}
          </p>
          <button className="library-button">add episode</button>
        </div>
      </div>
    </div>
  );
}
