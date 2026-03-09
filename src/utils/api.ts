async function jikan(query: string) {
  const url = "https://api.jikan.moe/v4/";
  const res = await fetch(url + query);

  if (!res.ok) {
    return res.statusText;
  }

  return await res.json();
}

export const getAnime = () => jikan("top/anime");
export const getAnimeBanner = () => jikan("top/anime?filter=airing&limit=10");
export const getAnimeByQuery = (query: string) => jikan(`anime?q=${query}`);
export const getCurrSeason = () => jikan("seasons/now");
export const getAnimeById = (id: string) => jikan(`anime/${id}`);
