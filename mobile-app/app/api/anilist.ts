interface DataProps {
  id: number;
  title: {
    english: string;
    native: string;
  };
  description: string;
  genres: string[];
  episodes: number;
}

interface AniListResponse {
  data: {
    Page: {
      media: DataProps[];
    };
  };
}

const AnimeQueryByName = `
query ($search: String!) {
  Page {
    media(search: $search, type: ANIME) {
      id
      title {
        english
        native
      }
      description
      genres
      episodes
    }
  }
}
`;

async function getAnimeByName(entryName: string) {
  const url = "https://graphql.anilist.co";

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: AnimeQueryByName,
      variables: { search: entryName },
    }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData, null, 2));
    }

    const data: AniListResponse = await response.json();

    const mediaList = data.data.Page.media;
    mediaList.forEach((anime) => {
      console.log(
        anime.title.english ?? anime.title.native,
        `(${anime.episodes} episodes)`
      );
    });

    return mediaList;
  } catch (error) {
    alert("Error, check console");
    console.error("GraphQL error:", error);
    return [];
  }
}

export default getAnimeByName;
