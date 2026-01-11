import { useParams } from "react-router";
import "./fullContent.css";

export default function FullContent() {
  let param = useParams();
  const desc: string = `Another day, another bounty—such is the life of the often unlucky crew
        of the Bebop. However, this routine is interrupted when Faye, who is
        chasing a fairly worthless target on Mars, witnesses an oil tanker
        suddenly explode, causing mass hysteria. As casualties mount due to a
        strange disease spreading through the smoke from the blast, a whopping
        three hundred million woolong price is placed on the head of the
        supposed perpetrator.\n\nWith lives at stake and a solution to their
        money problems in sight, the Bebop crew springs into action. Spike, Jet,
        Faye, and Edward, followed closely by Ein, split up to pursue different
        leads across Alba City. Through their individual investigations, they
        discover a cover-up scheme involving a pharmaceutical company, revealing
        a plot that reaches much further than the ragtag team of bounty hunters
        could have realized.\n\n[Written by MAL Rewrite]`;
  console.log(param);
  return (
    <>
      <iframe
        src="https://www.youtube-nocookie.com/embed/ZEkwCGJ3o7M?enablejsapi=1&wmode=opaque&autoplay=1"
        width="560"
        height="316"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
      <p className="content-desc">{desc}</p>
    </>
  );
}
