const url: string = "https://api.tenrai.org/v1/";

async function searchBy(title?: string) {
  const res = await fetch(`${url}anime?q=${title}`);
  return await res.json();
}

async function getAnimeById(id: number) {
  const res = await fetch(`${url}anime/${id}`);
  return (await res.json()) || "Error: Failed to fetch data";
}

export { searchBy, getAnimeById };
