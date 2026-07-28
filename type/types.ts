export type Show = {
  title: string;
  thumbnail: string;
  episodes: number;
};
// Temporary
export type Anime = {
  mal_id: number;
  title: string;
  images: {
    webp: {
      image_url: string;
    };
  };
};
