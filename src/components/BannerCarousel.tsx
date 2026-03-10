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
        <p>#{data?.ranking}</p>
        <div className="carousel-desc">
          <p>{data?.synopsis}</p>
        </div>
      </div>
    </>
  );
}

export default function BannerCarousel({ data }: CarouselProp) {
  const [currBanner, setCurrBanner] = useState<number>(0);

  const moveBanner = (dir: string) => {
    const step = dir === "right" ? 1 : -1;
    setCurrBanner((prev) => (prev + step + data.length) % data.length);
  };

  return (
    <div className="banner-carousel">
      <button className="carousel-prev-btn" onClick={() => moveBanner("left")}>
        <img src="/previous.png" alt="<" />
      </button>
      <button className="carousel-next-btn" onClick={() => moveBanner("right")}>
        <img src="/next.png" alt="<" />
      </button>
      <div className="left-carousel-cont">
        <BannerData {...data[currBanner]} />
      </div>

      <div className="main-carousel-cont">
        <BannerData {...data[currBanner]} />
      </div>
      <div className="right-carousel-cont">
        <BannerData {...data[currBanner]} />
      </div>
    </div>
  );
}
