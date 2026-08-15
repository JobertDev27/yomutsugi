export type Show = {
    title: string;
    cover: string;
    thumbnail: string;
}

export type TenraiApi = {
  mal_id: number;
  title: string;
  episodes: number;
  images: {
    webp: {
      image_url: string;
      large_image_url: string;
      small_image_url: string;
    };
  };
};
