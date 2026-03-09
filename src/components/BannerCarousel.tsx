import "./styles/bannerCarousel.css";
import { type CardProp } from "../utils/types";

type CarouselProp = {
  data: CardProp[];
};

export default function BannerCarousel({ data }: CarouselProp) {
  return (
    <div className="banner-carousel">
      <div className="left-carousel-cont">
        {" "}
        <img src={data[0].image} alt="" />
        <div className="carousel-data">
          <p>{data[0].name}</p>
          <p>#{data[0].ranking}</p>
        </div>
      </div>
      <div className="main-carousel-cont">
        <img src={data[0].image} alt="" />
        <div className="carousel-data">
          <p>{data[0].name}</p>
          <p>#{data[0].ranking}</p>
        </div>
      </div>
      <div className="right-carousel-cont">
        {" "}
        <img src={data[0].image} alt="" />
        <div className="carousel-data">
          <p>{data[0].name}</p>
          <p>#{data[0].ranking}</p>
        </div>
      </div>
    </div>
  );
}
