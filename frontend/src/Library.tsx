import Header from "./components/Header";
import { get_anime } from "./api";

export default function Library() {
  console.log(get_anime);
  return (
    <>
      <Header />
    </>
  );
}
