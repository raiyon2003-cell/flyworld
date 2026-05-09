import { SearchView } from "@/components/search-view";

export default function SearchPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return <SearchView params={searchParams} />;
}
