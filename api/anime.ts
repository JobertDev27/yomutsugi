const url: string = "https://api.tenrai.org/v1/";

async function getAllAnime() {
  const res = await fetch(`${url}anime`);
  return await res.json();
}

async function searchBy(title?: string) {
  const res = await fetch(`${url}anime?q=${title}`);
}

async function getAnimeById(id: number) {
  const res = await fetch(`${url}anime/${id}`);
  return (await res.json()) || "Error: Failed to fetch data";
}

export { getAllAnime, searchBy, getAnimeById };
