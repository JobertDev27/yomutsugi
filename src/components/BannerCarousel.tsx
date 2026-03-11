import "./styles/bannerCarousel.css";
import { type CardProp } from "../utils/types";
import { useState } from "react";

type CarouselProp = {
  data: CardProp[];
};

function BannerData(data: CardProp) {
  return (
    <>
      <img src={data?.image} alt="" />
      <div className="carousel-data">
        <p className="carousel-title">{data?.name}</p>
        <div className="carousel-score">
          <div>
            <img src="/leaderboard.png" alt="" />
            <p>{data?.ranking}</p>
          </div>
          <div>
            <img src="/star.png" alt="" />
            <p>{data?.rating}</p>
          </div>
        </div>
        {data?.episodes && <p>{data?.episodes} Episodes</p>}
        <div className="carousel-desc">
          <p>{data?.synopsis}</p>
        </div>
      </div>
    </>
  );
}

export default function BannerCarousel({ data }: CarouselProp) {
  const [currBanner, setCurrBanner] = useState<number>(0);

  const loopArray = (step: number) => {
    return (currBanner + step + data.length) % data.length;
  };

  const moveBanner = (step: number) => {
    setCurrBanner(loopArray(step));
  };

  return (
    <div className="banner-carousel">
      <button className="carousel-prev-btn" onClick={() => moveBanner(-1)}>
        <img src="/previous.png" alt="<" />
      </button>
      <button className="carousel-next-btn" onClick={() => moveBanner(1)}>
        <img src="/next.png" alt="<" />
      </button>
      <div className="left-carousel-cont">
        <BannerData {...data[loopArray(-1)]} />
      </div>

      <div className="main-carousel-cont">
        <BannerData {...data[currBanner]} />
      </div>
      <div className="right-carousel-cont">
        <BannerData {...data[loopArray(+1)]} />
      </div>
    </div>
  );
}
