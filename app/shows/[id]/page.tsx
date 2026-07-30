import { SearchPage } from "@/type/types";

export default async function Page({ params }: SearchPage) {
  const { id, title } = await params;
  return <h1>search results for: {title}</h1>;
}
