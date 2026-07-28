export type Show = {
  title: string;
  thumbnail: string;
  cover: string;
  episodes: number;
};

// anime api type
export type Anime = {
  mal_id: number;
  title: string;
  episodes: number;
  images: {
    webp: {
      large_image_url: string;
      small_image_url: string;
    };
  };
};
