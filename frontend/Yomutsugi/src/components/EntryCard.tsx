import "./css/entrycard.css";

interface Props {
  title: string;
  image: string;
  rating: number;
}

export default function EntryCard(data: Props) {
  const clickHandler = () => {};
  return (
    <div className="entry-container" onClick={() => clickHandler()}>
      <img src={data.image} alt="" />
      <div className="entry-data">
        <span className="entry-title">{data.title}</span>
        <span className="entry-rating">{data.rating}</span>
      </div>
    </div>
  );
}
