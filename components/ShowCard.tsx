import { Show } from "@/type/types";
import Image from "next/image";

export default function ShowCard(show: Show) {
  return (
    <div>
      <Image
        className="max-h-'720px' lg:h-60"
        src={show.thumbnail}
        width={405}
        height={720}
        alt=""
        loading="eager"
      />
      <p>{show.title}</p>
    </div>
  );
}
