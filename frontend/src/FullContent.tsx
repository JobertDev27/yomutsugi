import { useParams } from "react-router";

export default function FullContent() {
  let param = useParams();
  console.log(param);
  return <h1>{param.malId}</h1>;
}
