async function jikan(query: String) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/${query}`);
    if (!res.ok) {
      return res.statusText;
    }
    return await res.json();
  } catch (error) {
    return console.error(error);
  }
}

export const get_anime = () => jikan("anime");
export const get_curr_season = () => jikan("seasons/now");
export const get_anime_by_id = (id: String) => jikan(`anime/${id}`);
