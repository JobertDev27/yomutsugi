import type { Show, Tenrai } from "../types/type";

const url: string = "https://api.tenrai.org/v1/";

function _apiMapper(data: Tenrai): Show {
  return {
    title: data.title,
    thumbnail: data.images.webp.small_image_url,
    cover: data.images.webp.large_image_url,
  };
}

export async function getAllAnime(): Promise<Show[]> {
  const res = await fetch(`${url}anime`);
  const json = await res.json();
  return json.data.map(_apiMapper);
}

export async function searchBy(title?: string): Promise<Show> {
  const res = await fetch(`${url}anime?q=${title}`);
  const data = await res.json();
  return _apiMapper(data);
}
