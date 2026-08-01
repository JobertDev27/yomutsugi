import { Anime, Show } from "@/type/types";

const url: string = "https://api.tenrai.org/v1/";

function _apiMapper(data: Anime): Show {
  return {
    title: data.title,
    thumbnail: data.images.webp.image_url,
    cover: data.images.webp.large_image_url,
    episodes: data.episodes
  };
}

async function getAllAnime() {
  const res = await fetch(`${url}anime`);
  const json = await res.json();
  return json.data.map(_apiMapper);
}

async function searchBy(title?: string) {
  const res = await fetch(`${url}anime?q=${title}`);
  const json = await res.json();
  return _apiMapper(json.data);
}

async function getAnimeById(id: number) {
  const res = await fetch(`${url}anime/${id}`);
  const json = await res.json();
  return _apiMapper(json.data);
}

export { getAllAnime, searchBy, getAnimeById };
