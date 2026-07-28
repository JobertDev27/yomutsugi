import { Anime } from "@/type/types";
import Image from "next/image";

export default function ShowCard(show: Anime) {
  return (
    <div>
      <Image src={show.images.webp.image_url} width={405} height={720} alt="" />
      <p>{show.title}</p>
    </div>
  );
}
