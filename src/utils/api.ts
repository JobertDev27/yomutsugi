async function jikan(query: string) {
  const api = "https://api.jikan.moe/v4/";
  const res = await fetch(api + query);

  if (!res.ok) {
    return res.statusText;
  }

  return await res.json();
}

export const get_anime = () => jikan("top/anime");
export const get_anime_by_query = (query: string) => jikan(`anime?q=${query}`);
export const get_curr_season = () => jikan("seasons/now");
export const get_anime_by_id = (id: string) => jikan(`anime/${id}`);
