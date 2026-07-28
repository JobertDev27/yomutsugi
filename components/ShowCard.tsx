import { Show } from "@/type/types";
import Image from "next/image";

export default function ShowCard(show: Show) {
  return (
    <div>
      <Image src={show.thumbnail} width={405} height={720} alt="" />
      <p>{show.title}</p>
    </div>
  );
}
