export type Show = {
    id: number;
    title: string;
    cover: string;
    thumbnail: string;
    ep: number;
    desc: string;
}

export type Tenrai = {
    mal_id: number;
    title: string;
    episodes: number;
    synopsis: string;
    images: {
	webp: {
	    image_url: string;
	    large_image_url: string;
	    small_image_url: string;
	};
    };
};
